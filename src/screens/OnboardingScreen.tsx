import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Try to import LinearGradient, fallback to View if not available
let LinearGradient: any;
try {
  LinearGradient = require('react-native-linear-gradient').default;
} catch {
  LinearGradient = View; // Fallback to View if not linked
}

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleContinue = () => {
    // Navigate to phone number screen
    navigation.navigate('PhoneNumber');
  };

  const handleTermsPress = () => {
    // Handle Terms & Conditions link
    Linking.openURL('https://example.com/terms');
  };

  const handlePrivacyPress = () => {
    // Handle Privacy Policy link
    Linking.openURL('https://example.com/privacy');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Top Section - Illustration */}
      <View style={styles.illustrationContainer}>
        {!imageError ? (
          <Image
            source={require('../assets/images/Onboardingimage.png')}
            style={styles.illustration}
            resizeMode="contain"
            onError={() => {
              console.log('Image failed to load');
              setImageError(true);
            }}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Illustration</Text>
          </View>
        )}
      </View>

      {/* Bottom Section - Text and Button */}
      <View style={styles.bottomSection}>
        <Text style={styles.heading}>
          <Text style={styles.headingBold}>Explore your destination</Text>
          {'\n'}
          <Text style={styles.headingRegular}>with Me4u</Text>
        </Text>

        <TouchableOpacity
          style={styles.gradientButton}
          onPress={handleContinue}
          activeOpacity={0.8}>
          {LinearGradient !== View ? (
            <LinearGradient
              colors={['#FF4500', '#FF8C00']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Continue with Phone Number</Text>
            </LinearGradient>
          ) : (
            <View style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Continue with Phone Number</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          By continuing, you agree that you have read and accept{'\n'}
          our{' '}
          <Text style={styles.link} onPress={handleTermsPress}>
            T&Cs
          </Text>{' '}
          along with{' '}
          <Text style={styles.link} onPress={handlePrivacyPress}>
            Privacy Policy
          </Text>
        </Text>
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
    flex: 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
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
  bottomSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    color: '#000000',
    textAlign: 'left',
    marginBottom: 24,
    lineHeight: 32,
  },
  headingBold: {
    fontWeight: '700',
  },
  headingRegular: {
    fontWeight: '400',
  },
  gradientButton: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
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
  disclaimer: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 8,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#666666',
  },
});

export default OnboardingScreen;
