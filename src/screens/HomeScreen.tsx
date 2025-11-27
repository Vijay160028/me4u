import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Responsive scaling functions
const scale = (size: number) => {
  const baseWidth = 375; // iPhone X base width
  return (SCREEN_WIDTH / baseWidth) * size;
};

const scaleFont = (size: number) => {
  const baseWidth = 375;
  const ratio = SCREEN_WIDTH / baseWidth;
  const newSize = size * ratio;
  if (Platform.OS === 'ios') {
    return Math.max(12, Math.round(newSize));
  }
  return Math.max(12, newSize);
};

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation: _navigation}) => {
  const userName = 'Abhishek Singh'; // This would come from user data/context
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom || 0;
  const tabBarHeight = scale(60) + bottomInset;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, {paddingBottom: tabBarHeight + scale(20)}]}
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hello</Text>
            <Text style={styles.userNameText}>{userName}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileEmoji}>👤</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Where to go"
            placeholderTextColor="#999999"
          />
          <View style={styles.searchIcon}>
            <Text style={styles.searchIconText}>🔍</Text>
          </View>
        </View>

        {/* Service Categories - Top Section */}
        <View style={styles.serviceContainer}>
          <TouchableOpacity style={styles.serviceButton}>
            <View style={[styles.serviceIcon, styles.cabIcon]}>
              <Text style={styles.serviceIconText}>🚕</Text>
            </View>
            <Text style={styles.serviceLabel}>Cab</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButton}>
            <View style={[styles.serviceIcon, styles.flightIcon]}>
              <Text style={styles.serviceIconText}>✈️</Text>
            </View>
            <Text style={styles.serviceLabel}>Flights</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButton}>
            <View style={[styles.serviceIcon, styles.busIcon]}>
              <Text style={styles.serviceIconText}>🚌</Text>
            </View>
            <Text style={styles.serviceLabel}>Buses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButton}>
            <View style={[styles.serviceIcon, styles.hostelIcon]}>
              <Text style={styles.serviceIconText}>🏨</Text>
            </View>
            <Text style={styles.serviceLabel}>Hostel</Text>
          </TouchableOpacity>
        </View>

        {/* Promotional Section */}
        <View style={styles.promoContainer}>
          <ImageBackground
            source={require('../assets/images/promo-background.png')}
            style={styles.promoBackground}
            resizeMode="cover">
            <View style={styles.promoOverlay}>
              <Text style={styles.promoHeading}>
                Where is your next destination?
              </Text>
              <Text style={styles.promoText}>
                Lorem ipsum dolor sit amet consectetur. Elementum et
              </Text>
              <TouchableOpacity>
                <Text style={styles.learnMoreLink}>Learn more</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Curator's Pick Section */}
        <View style={styles.curatorContainer}>
          <Text style={styles.curatorHeading}>Curator's Pick</Text>
          <Text style={styles.curatorSubtext}>
            The best experience based on your preferences
          </Text>
          <Text style={styles.categoryLabel}>Cultural</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.destinationScroll}
            contentContainerStyle={styles.destinationScrollContent}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.destinationCard}
                activeOpacity={0.9}>
                <ImageBackground
                  source={require('../assets/images/destination-card.png')}
                  style={styles.destinationImage}
                  resizeMode="cover"
                  imageStyle={styles.destinationImageStyle}>
                  <View style={styles.destinationOverlay}>
                    <TouchableOpacity style={styles.discoverButton}>
                      <Text style={styles.discoverIcon}>💎</Text>
                      <Text style={styles.discoverText}>
                        Discover Hidden Gems
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // paddingBottom is calculated dynamically based on tab bar height
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: scale(24),
    paddingTop: scale(20),
    paddingBottom: scale(20),
    backgroundColor: '#FFFFFF',
    minHeight: scale(80),
  },
  greetingContainer: {
    flex: 1,
    marginRight: scale(12),
  },
  greetingText: {
    fontSize: scaleFont(32),
    fontWeight: '700',
    color: '#000000',
    marginBottom: scale(4),
  },
  userNameText: {
    fontSize: scaleFont(18),
    color: '#666666',
    fontWeight: '400',
  },
  profileButton: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    overflow: 'hidden',
    backgroundColor: 'transparent',
    minWidth: scale(56),
  },
  profileIcon: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: '#FFEB3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmoji: {
    fontSize: scaleFont(28),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    marginBottom: scale(24),
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    paddingHorizontal: scale(20),
    paddingRight: scale(50),
    paddingVertical: scale(16),
    fontSize: scaleFont(16),
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: scale(50),
  },
  searchIcon: {
    position: 'absolute',
    right: scale(44),
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconText: {
    fontSize: scaleFont(20),
  },
  promoContainer: {
    marginHorizontal: scale(24),
    marginBottom: scale(32),
    borderRadius: scale(20),
    overflow: 'hidden',
    height: scale(220),
    minHeight: scale(180),
    maxHeight: scale(250),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  promoBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  promoOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: scale(24),
    paddingBottom: scale(24),
    paddingTop: scale(40),
  },
  promoHeading: {
    fontSize: scaleFont(28),
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: scale(12),
    lineHeight: scale(36),
  },
  promoText: {
    fontSize: scaleFont(15),
    color: '#FFFFFF',
    marginBottom: scale(16),
    lineHeight: scale(22),
    opacity: 0.95,
  },
  learnMoreLink: {
    fontSize: scaleFont(14),
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(24),
    marginBottom: scale(32),
    backgroundColor: '#FFFFFF',
    paddingTop: scale(16),
    paddingBottom: scale(16),
  },
  serviceButton: {
    alignItems: 'center',
    flex: 1,
    minWidth: scale(60),
    maxWidth: scale(90),
  },
  serviceIcon: {
    width: scale(70),
    height: scale(70),
    minWidth: scale(60),
    minHeight: scale(60),
    maxWidth: scale(80),
    maxHeight: scale(80),
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(12),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cabIcon: {
    backgroundColor: '#FFFFFF',
  },
  flightIcon: {
    backgroundColor: '#FFFFFF',
  },
  busIcon: {
    backgroundColor: '#FFFFFF',
  },
  hostelIcon: {
    backgroundColor: '#FFFFFF',
  },
  serviceIconText: {
    fontSize: scaleFont(32),
  },
  serviceLabel: {
    fontSize: scaleFont(14),
    color: '#333333',
    fontWeight: '600',
    textAlign: 'center',
  },
  curatorContainer: {
    paddingHorizontal: scale(24),
    marginBottom: scale(24),
  },
  curatorHeading: {
    fontSize: scaleFont(24),
    fontWeight: '700',
    color: '#000000',
    marginBottom: scale(8),
  },
  curatorSubtext: {
    fontSize: scaleFont(15),
    color: '#666666',
    marginBottom: scale(20),
    lineHeight: scale(22),
  },
  categoryLabel: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#000000',
    marginBottom: scale(20),
  },
  destinationScroll: {
    marginHorizontal: scale(-24),
    paddingLeft: scale(24),
  },
  destinationScrollContent: {
    paddingRight: scale(24),
  },
  destinationCard: {
    width: SCREEN_WIDTH - scale(48),
    height: scale(280),
    minHeight: scale(240),
    maxHeight: scale(320),
    borderRadius: scale(20),
    marginRight: scale(16),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  destinationImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationImageStyle: {
    opacity: 0.9,
  },
  destinationOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  discoverButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: scale(12),
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  discoverIcon: {
    fontSize: scaleFont(16),
    marginRight: scale(8),
  },
  discoverText: {
    color: '#FFFFFF',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
});

export default HomeScreen;

