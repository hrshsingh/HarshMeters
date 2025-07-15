// TermsAndConditionsScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TermsAndConditionsScreen = ({ navigation }) => {
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 20;

        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            setHasScrolledToBottom(true);
        }
    };

    const handleAccept = () => {
        Alert.alert(
            'Terms Accepted',
            'You have accepted the Terms and Conditions.',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Fixed Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms and Conditions</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.contentContainer}>

                    {/* Introduction */}
                    <Text style={styles.sectionTitle}>1. Introduction</Text>
                    <Text style={styles.paragraph}>
                        Welcome to our mobile application. These Terms and Conditions ("Terms") govern your use of our app and services. By downloading, installing, or using our app, you agree to be bound by these Terms.
                    </Text>

                    {/* Acceptance of Terms */}
                    <Text style={styles.sectionTitle}>2. Acceptance of Terms</Text>
                    <Text style={styles.paragraph}>
                        By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this app's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </Text>

                    {/* User Accounts */}
                    <Text style={styles.sectionTitle}>3. User Accounts</Text>
                    <Text style={styles.paragraph}>
                        To access certain features of our app, you may be required to create an account. You are responsible for:
                    </Text>
                    <Text style={styles.bulletPoint}>• Maintaining the confidentiality of your account credentials</Text>
                    <Text style={styles.bulletPoint}>• All activities that occur under your account</Text>
                    <Text style={styles.bulletPoint}>• Providing accurate and complete information</Text>
                    <Text style={styles.bulletPoint}>• Notifying us immediately of any unauthorized use</Text>

                    {/* Privacy Policy */}
                    <Text style={styles.sectionTitle}>4. Privacy Policy</Text>
                    <Text style={styles.paragraph}>
                        Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our app. By using our app, you consent to the collection and use of information in accordance with our Privacy Policy.
                    </Text>

                    {/* User Conduct */}
                    <Text style={styles.sectionTitle}>5. User Conduct</Text>
                    <Text style={styles.paragraph}>
                        You agree not to use the app for any unlawful purpose or in any way that could damage, disable, or impair the app. Prohibited activities include:
                    </Text>
                    <Text style={styles.bulletPoint}>• Violating any applicable laws or regulations</Text>
                    <Text style={styles.bulletPoint}>• Transmitting harmful or malicious code</Text>
                    <Text style={styles.bulletPoint}>• Attempting to gain unauthorized access</Text>
                    <Text style={styles.bulletPoint}>• Interfering with other users' use of the app</Text>
                    <Text style={styles.bulletPoint}>• Uploading inappropriate or offensive content</Text>

                    {/* Intellectual Property */}
                    <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
                    <Text style={styles.paragraph}>
                        The app and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </Text>

                    {/* App Availability */}
                    <Text style={styles.sectionTitle}>7. App Availability</Text>
                    <Text style={styles.paragraph}>
                        We strive to keep the app available at all times, but we cannot guarantee uninterrupted access. The app may be temporarily unavailable due to maintenance, updates, or technical issues beyond our control.
                    </Text>

                    {/* Payments and Subscriptions */}
                    <Text style={styles.sectionTitle}>8. Payments and Subscriptions</Text>
                    <Text style={styles.paragraph}>
                        If our app offers paid services or subscriptions:
                    </Text>
                    <Text style={styles.bulletPoint}>• All payments are processed securely through authorized payment providers</Text>
                    <Text style={styles.bulletPoint}>• Subscription fees are charged in advance on a recurring basis</Text>
                    <Text style={styles.bulletPoint}>• You may cancel your subscription at any time</Text>
                    <Text style={styles.bulletPoint}>• Refunds are subject to our refund policy</Text>

                    {/* Disclaimers */}
                    <Text style={styles.sectionTitle}>9. Disclaimers</Text>
                    <Text style={styles.paragraph}>
                        The information in this app is provided on an "as is" basis. We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
                    </Text>

                    {/* Limitation of Liability */}
                    <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
                    <Text style={styles.paragraph}>
                        In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </Text>

                    {/* Third-Party Services */}
                    <Text style={styles.sectionTitle}>11. Third-Party Services</Text>
                    <Text style={styles.paragraph}>
                        Our app may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites or services.
                    </Text>

                    {/* Termination */}
                    <Text style={styles.sectionTitle}>12. Termination</Text>
                    <Text style={styles.paragraph}>
                        We may terminate or suspend your account and access to the app immediately, without prior notice, for any reason, including if you breach these Terms.
                    </Text>

                    {/* Updates to Terms */}
                    <Text style={styles.sectionTitle}>13. Updates to Terms</Text>
                    <Text style={styles.paragraph}>
                        We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms in the app. Your continued use of the app after changes constitutes acceptance of the new Terms.
                    </Text>

                    {/* Governing Law */}
                    <Text style={styles.sectionTitle}>14. Governing Law</Text>
                    <Text style={styles.paragraph}>
                        These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                    </Text>

                    {/* Contact Information */}
                    <Text style={styles.sectionTitle}>15. Contact Information</Text>
                    <Text style={styles.paragraph}>
                        If you have any questions about these Terms and Conditions, please contact us at:
                    </Text>
                    <Text style={styles.contactInfo}>Email: support@yourapp.com</Text>
                    <Text style={styles.contactInfo}>Phone: +1 (555) 123-4567</Text>
                    <Text style={styles.contactInfo}>Address: 123 App Street, Tech City, TC 12345</Text>

                    {/* Last Updated */}
                    <Text style={styles.lastUpdated}>
                        Last updated: {new Date().toLocaleDateString()}
                    </Text>

                    {/* Bottom Spacing */}
                    <View style={styles.bottomSpacing} />
                </View>
            </ScrollView>

            {/* Fixed Bottom Accept Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={[
                        styles.acceptButton,
                        !hasScrolledToBottom && styles.acceptButtonDisabled
                    ]}
                    onPress={handleAccept}
                    disabled={!hasScrolledToBottom}
                >
                    <Text style={[
                        styles.acceptButtonText,
                        !hasScrolledToBottom && styles.acceptButtonTextDisabled
                    ]}>
                        ACCEPTED
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default TermsAndConditionsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    placeholder: {
        width: 40,
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginTop: 24,
        marginBottom: 12,
        lineHeight: 24,
    },
    paragraph: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        marginBottom: 16,
        textAlign: 'justify',
    },
    bulletPoint: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        marginBottom: 8,
        marginLeft: 16,
    },
    contactInfo: {
        fontSize: 14,
        color: '#007AFF',
        lineHeight: 22,
        marginBottom: 4,
        marginLeft: 16,
    },
    lastUpdated: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginTop: 32,
        fontStyle: 'italic',
    },
    bottomSpacing: {
        height: 80,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    acceptButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignSelf: 'flex-end',
        minWidth: 120,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    acceptButtonDisabled: {
        backgroundColor: '#ccc',
        elevation: 0,
        shadowOpacity: 0,
    },
    acceptButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    acceptButtonTextDisabled: {
        color: '#999',
    },
});