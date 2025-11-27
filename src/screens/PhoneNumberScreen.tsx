import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Try to import LinearGradient, fallback to View if not available
let LinearGradient: any;
try {
  LinearGradient = require('react-native-linear-gradient').default;
} catch {
  LinearGradient = View; // Fallback to View if not linked
}

interface PhoneNumberScreenProps {
  navigation: any;
}

const PhoneNumberScreen: React.FC<PhoneNumberScreenProps> = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('7077388624');
  const [countryCode] = useState('+91');

  const handleNext = () => {
    // Navigate to OTP screen
    navigation.navigate('OTP');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const clearPhoneNumber = () => {
    setPhoneNumber('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Title and Instructions */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter your phone number for verification</Text>
        <Text style={styles.description}>
          This phone number will be used for communication with cab drivers. You
          will receive an SMS with verification code.
        </Text>

        {/* Phone Number Input Field */}
        <View style={styles.phoneInputContainer}>
          {/* Country Code Selector */}
          <TouchableOpacity style={styles.countryCodeContainer}>
            <View style={[styles.flagIcon, styles.flagPlaceholder]}>
              <Text style={styles.flagEmoji}>🇮🇳</Text>
            </View>
            <Text style={styles.countryCode}>{countryCode}</Text>
            <Text style={styles.chevron}>⌄</Text>
          </TouchableOpacity>

          {/* Separator */}
          <View style={styles.separator} />

          {/* Phone Number Input */}
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            placeholderTextColor="#999999"
            keyboardType="phone-pad"
            maxLength={10}
          />

          {/* Clear Button */}
          {phoneNumber.length > 0 && (
            <TouchableOpacity
              onPress={clearPhoneNumber}
              style={styles.clearButton}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.gradientButton}
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={phoneNumber.length < 10}>
          {LinearGradient !== View ? (
            <LinearGradient
              colors={['#FF4500', '#FF8C00']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[
                styles.buttonGradient,
                phoneNumber.length < 10 && styles.buttonDisabled,
              ]}>
              <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.buttonGradient,
                phoneNumber.length < 10 && styles.buttonDisabled,
              ]}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    lineHeight: 32,
    textAlign: 'left',
  },
  description: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 40,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    height: 60,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagPlaceholder: {
    backgroundColor: 'transparent',
  },
  flagEmoji: {
    fontSize: 20,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginRight: 4,
  },
  chevron: {
    fontSize: 12,
    color: '#666666',
  },
  separator: {
    width: 1,
    height: 32,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 0,
    height: '100%',
  },
  clearButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  clearIcon: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  gradientButton: {
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
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PhoneNumberScreen;
