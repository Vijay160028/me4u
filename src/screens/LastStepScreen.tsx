import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';

// Try to import LinearGradient, fallback to View if not available
let LinearGradient: any;
try {
  LinearGradient = require('react-native-linear-gradient').default;
} catch {
  LinearGradient = View; // Fallback to View if not linked
}

interface LastStepScreenProps {
  navigation: any;
}

type Gender = 'male' | 'female' | 'other';

const LastStepScreen: React.FC<LastStepScreenProps> = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedGender, setSelectedGender] = useState<Gender>('male');

  const handleLetsTravel = () => {
    // Validate and submit user information
    if (fullName.trim() && email.trim() && lastName.trim()) {
      console.log('User info submitted:', {
        fullName,
        lastName,
        email,
        gender: selectedGender,
      });
      // Navigate to home screen and reset navigation stack (prevent going back)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeTabs'}],
        }),
      );
    } else {
      console.log('Please fill in all fields');
    }
  };

  const handleReferralClick = () => {
    // Handle referral code click
    console.log('Referral code clicked');
    // You can navigate to a referral code input screen
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.title}>Last Step</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="FULL NAME"
            placeholderTextColor="#999999"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="EMAIL"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="FULL NAME"
            placeholderTextColor="#999999"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
        </View>

        {/* Gender Selection */}
        <View style={styles.genderContainer}>
          <Text style={styles.genderLabel}>Select your gender</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setSelectedGender('male')}>
              <View style={styles.radioButton}>
                {selectedGender === 'male' && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <Text style={styles.radioLabel}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setSelectedGender('female')}>
              <View style={styles.radioButton}>
                {selectedGender === 'female' && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <Text style={styles.radioLabel}>Female</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setSelectedGender('other')}>
              <View style={styles.radioButton}>
                {selectedGender === 'other' && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <Text style={styles.radioLabel}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Let's Travel Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.gradientButton}
            onPress={handleLetsTravel}
            activeOpacity={0.8}>
            {LinearGradient !== View ? (
              <LinearGradient
                colors={['#FF4500', '#FF8C00']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonGradient}>
                <Text style={styles.buttonText}>LET'S TRAVEL</Text>
              </LinearGradient>
            ) : (
              <View style={styles.buttonGradient}>
                <Text style={styles.buttonText}>LET'S TRAVEL</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Referral Code Section */}
        <View style={styles.referralContainer}>
          <View style={styles.giftIcon}>
            <Text style={styles.giftIconText}>🎁</Text>
          </View>
          <Text style={styles.referralText}>Use a referral code</Text>
          <TouchableOpacity onPress={handleReferralClick}>
            <Text style={styles.referralLink}>Click Here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  genderContainer: {
    marginBottom: 32,
  },
  genderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666666',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000000',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  gradientButton: {
    width: '100%',
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
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  referralContainer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginTop: 'auto',
  },
  giftIcon: {
    marginBottom: 8,
  },
  giftIconText: {
    fontSize: 32,
  },
  referralText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  referralLink: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

export default LastStepScreen;

