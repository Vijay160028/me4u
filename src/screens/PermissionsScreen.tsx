import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Try to import react-native-permissions with fallback
let PERMISSIONS: any;
let check: any;
let request: any;
let RESULTS: any;
let openSettings: any;

try {
  const permissionsModule = require('react-native-permissions');
  PERMISSIONS = permissionsModule.PERMISSIONS;
  check = permissionsModule.check;
  request = permissionsModule.request;
  RESULTS = permissionsModule.RESULTS;
  openSettings = permissionsModule.openSettings;
} catch {
  // Fallback if react-native-permissions is not available
  console.warn('react-native-permissions not available');
  PERMISSIONS = {
    IOS: {},
    ANDROID: {},
  };
  check = async () => 'unavailable';
  request = async () => 'unavailable';
  RESULTS = {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
    UNAVAILABLE: 'unavailable',
  };
  openSettings = () => {};
}

// Try to import LinearGradient, fallback to View if not available
let LinearGradient: any;
try {
  LinearGradient = require('react-native-linear-gradient').default;
} catch {
  LinearGradient = View; // Fallback to View if not linked
}

interface PermissionsScreenProps {
  navigation: any;
}

const PermissionsScreen: React.FC<PermissionsScreenProps> = ({navigation}) => {
  const [imageError, setImageError] = React.useState(false);
  const [_locationPermission, setLocationPermission] = React.useState<string>('undetermined');
  const [_phonePermission, setPhonePermission] = React.useState<string>('undetermined');
  const [isRequesting, setIsRequesting] = React.useState(false);

  // Get permission types based on platform
  const locationPermissionType =
    Platform.OS === 'ios' && PERMISSIONS?.IOS?.LOCATION_WHEN_IN_USE
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS?.ANDROID?.ACCESS_FINE_LOCATION || 'android.permission.ACCESS_FINE_LOCATION';

  // Check current permission status on mount
  const checkPermissions = React.useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        // For Android, check using PermissionsAndroid
        const locationCheck = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        setLocationPermission(locationCheck ? 'granted' : 'denied');
        
        const phoneCheck = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        );
        setPhonePermission(phoneCheck ? 'granted' : 'denied');
      } else {
        // For iOS, try to use react-native-permissions if available
        if (check && locationPermissionType && typeof check === 'function') {
          try {
            const locationStatus = await check(locationPermissionType);
            setLocationPermission(locationStatus);
          } catch {
            setLocationPermission('undetermined');
          }
        }
        // For iOS, phone permission is not typically requested
        setPhonePermission('granted');
      }
    } catch (error) {
      console.warn('Error checking permissions:', error);
    }
  }, [locationPermissionType]);

  React.useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        // For Android, use PermissionsAndroid for better compatibility
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Me4u needs access to your location to find suitable rides',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationPermission('granted');
          return true;
        } else {
          setLocationPermission('denied');
          return false;
        }
      } else {
        // For iOS, use react-native-permissions if available
        if (request && locationPermissionType && typeof request === 'function' && RESULTS) {
          try {
            const result = await request(locationPermissionType);
            setLocationPermission(result);
            
            if (result === RESULTS.GRANTED) {
              return true;
            } else if (result === RESULTS.BLOCKED || result === RESULTS.UNAVAILABLE) {
              Alert.alert(
                'Permission Required',
                'Location permission is required. Please enable it in Settings.',
                [
                  {text: 'Cancel', style: 'cancel'},
                  {text: 'Open Settings', onPress: () => {
                    if (openSettings && typeof openSettings === 'function') {
                      openSettings();
                    }
                  }},
                ],
              );
              return false;
            }
            return false;
          } catch (e) {
            console.warn('Error requesting iOS location permission:', e);
            Alert.alert(
              'Permission Required',
              'Please enable location permission in Settings.',
            );
            return false;
          }
        } else {
          // Fallback if react-native-permissions is not available
          Alert.alert(
            'Permission Required',
            'Please enable location permission in Settings.',
          );
          return false;
        }
      }
    } catch (error) {
      console.warn('Error requesting location permission:', error);
      return false;
    }
  };

  const requestPhonePermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        // For Android, use PermissionsAndroid
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          {
            title: 'Phone Permission',
            message: 'Me4u needs access to your phone for account security verification',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPhonePermission('granted');
          return true;
        } else {
          setPhonePermission('denied');
          return false;
        }
      } else {
        // For iOS, phone state permission is not typically available
        // We'll just mark it as granted since iOS handles this differently
        setPhonePermission('granted');
        return true;
      }
    } catch (error) {
      console.warn('Error requesting phone permission:', error);
      return false;
    }
  };

  const handleAllow = async () => {
    if (isRequesting) return;
    
    setIsRequesting(true);
    
    try {
      // Request both permissions sequentially
      const locationGranted = await requestLocationPermission();
      const phoneGranted = await requestPhonePermission();
      
      // Check if both permissions are granted
      const allGranted = locationGranted && phoneGranted;
      
      if (allGranted) {
        Alert.alert('Success', 'All permissions granted successfully!', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to last step screen
              navigation.navigate('LastStep');
            },
          },
        ]);
      } else {
        // Show which permissions were denied
        const deniedPermissions = [];
        if (!locationGranted) deniedPermissions.push('Location');
        if (!phoneGranted) deniedPermissions.push('Phone');
        
        Alert.alert(
          'Permissions Required',
          `Please grant ${deniedPermissions.join(' and ')} permission(s) to continue.`,
          [
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
            },
            {text: 'Cancel', style: 'cancel'},
          ],
        );
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'An error occurred while requesting permissions.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    // Navigate to last step screen without requesting permissions
    navigation.navigate('LastStep');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Top Section - Illustration */}
      <View style={styles.illustrationContainer}>
        {!imageError ? (
          <Image
            source={require('../assets/images/permissions-illustration.png')}
            style={styles.illustration}
            resizeMode="contain"
            onError={() => {
              console.log('Permissions illustration failed to load');
              setImageError(true);
            }}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Illustration</Text>
          </View>
        )}
      </View>

      {/* Bottom Section - Content */}
      <View style={styles.contentSection}>
        <Text style={styles.welcomeText}>Welcome to Me4u</Text>
        
        <Text style={styles.description}>
          Discover amazing destinations and create unforgettable memories with
          personalized end to end travel recommendations
        </Text>

        {/* Permission List */}
        <View style={styles.permissionList}>
          <View style={styles.permissionItem}>
            <View style={styles.bullet} />
            <Text style={styles.permissionText}>
              Location (for finding suitable rides)
            </Text>
          </View>
          <View style={styles.permissionItem}>
            <View style={styles.bullet} />
            <Text style={styles.permissionText}>
              Phone (for account security verification)
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.gradientButton}
            onPress={handleAllow}
            activeOpacity={0.8}
            disabled={isRequesting}>
            {LinearGradient !== View ? (
              <LinearGradient
                colors={['#FF4500', '#FF8C00']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[
                styles.buttonGradient,
                isRequesting && styles.buttonDisabled,
              ]}>
                <Text style={styles.buttonText}>
                  {isRequesting ? 'Requesting...' : 'Allow'}
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.buttonGradient,
                  isRequesting && styles.buttonDisabled,
                ]}>
                <Text style={styles.buttonText}>
                  {isRequesting ? 'Requesting...' : 'Allow'}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  illustrationContainer: {
    flex: 1.2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999999',
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  permissionList: {
    width: '100%',
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6347',
    marginRight: 12,
  },
  permissionText: {
    fontSize: 15,
    color: '#333333',
    flex: 1,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  gradientButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6347',
    minHeight: 56,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'underline',
  },
});

export default PermissionsScreen;

