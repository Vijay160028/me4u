import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Try to import LinearGradient, fallback to View if not available
let LinearGradient: any;
try {
  LinearGradient = require('react-native-linear-gradient').default;
} catch {
  LinearGradient = View; // Fallback to View if not linked
}

interface OTPScreenProps {
  navigation: any;
  route?: any;
}

const OTPScreen: React.FC<OTPScreenProps> = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute = 60 seconds
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (text: string, index: number) => {
    // Only allow digits
    const newText = text.replace(/[^0-9]/g, '');
    
    if (newText.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = newText;
      setOtp(newOtp);

      // Auto-focus next input
      if (newText.length === 1 && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit when all fields are filled
      if (newText.length === 1 && index === 4) {
        const finalOtp = [...newOtp];
        finalOtp[index] = newText;
        if (finalOtp.every(digit => digit !== '')) {
          Keyboard.dismiss();
          // Auto-verify when all digits are entered
          setTimeout(() => {
            handleVerify();
          }, 300);
        }
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 5) {
      console.log('OTP verified:', otpString);
      // Navigate to permissions screen
      navigation.navigate('Permissions');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleResendOtp = () => {
    // Reset timer to 60 seconds (1 minute)
    setTimeLeft(60);
    // Reset OTP fields
    setOtp(['', '', '', '', '']);
    // Focus on first input
    inputRefs.current[0]?.focus();
    // Here you would typically call your API to resend OTP
    console.log('Resending OTP...');
    // Example: resendOtpAPI();
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter your phone number for verification</Text>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.otpInputWrapper}>
              <TextInput
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                style={styles.otpInput}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                onKeyPress={({nativeEvent}) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            </View>
          ))}
        </View>

        {/* Auto-Verification Message or Resend OTP */}
        {timeLeft > 0 ? (
          <Text style={styles.autoVerifyText}>
            Auto verifying your OTP in ({formatTime(timeLeft)})
          </Text>
        ) : (
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive OTP? </Text>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resendLink}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Verify Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.gradientButton}
          onPress={handleVerify}
          activeOpacity={0.8}
          disabled={!isOtpComplete}>
          {LinearGradient !== View ? (
            <LinearGradient
              colors={['#FF4500', '#FF8C00']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[
                styles.buttonGradient,
                !isOtpComplete && styles.buttonDisabled,
              ]}>
              <Text style={styles.buttonText}>Verify</Text>
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.buttonGradient,
                !isOtpComplete && styles.buttonDisabled,
              ]}>
              <Text style={styles.buttonText}>Verify</Text>
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
    paddingTop: 32,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 48,
    textAlign: 'left',
    lineHeight: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 32,
    paddingHorizontal: 0,
  },
  otpInputWrapper: {
    alignItems: 'center',
    marginRight: 16,
  },
  otpInput: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 0,
    backgroundColor: '#F5F5F5',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    padding: 0,
  },
  autoVerifyText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'left',
    marginTop: 8,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    color: '#999999',
  },
  resendLink: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: '600',
    textDecorationLine: 'underline',
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
    letterSpacing: 0.5,
  },
});

export default OTPScreen;

