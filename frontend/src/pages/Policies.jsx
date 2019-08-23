import React from 'react';
import {css} from 'glamor';

import Header from '../components/Login/Header.jsx';

const constants = require('../js/constants');
const styles = {
    main: css({backgroundColor: constants.colors.background, height: '100%', maxWidth: '100vw'}),
    wrapper: css({color: 'white', margin: '50px 10%'}),
    title: css({fontSize: '2em', fontWeight: '900', fontFamily: 'Circular Bold', marginBottom: '10px', marginTop: '5px'}),
    subTitle: css({fontSize: '1.7em', fontFamily: 'Circular Bold', marginBottom: '7px', marginTop: '5px'}),
    heading: css({fontSize: '1.5em', fontFamily: 'Circular Bold', fontWeight: '900', marginBottom: '5px', marginTop: '4px'}),
    subHeading: css({fontSize: '1.2em', fontFamily: 'Circular Bold', fontWeight: 'italic', marginBottom: '5px', marginTop: '4px'}),
    paragraph: css({fontSize: '1em', margin: '15px 25px', fontFamily: 'Circular Book'}),
    list: css({listStyle: 'disc', marginLeft: '10%'}),
    listItem: css({margin: '5px'})
};
class Policies extends React.Component {
    render() {
        return (<div {... styles.main}>
            <Header/>
            <main {... styles.wrapper}>
                <div id="privacyPolicy">
                    <h1 {... styles.title}>Privacy Policy</h1>

                    <p {... styles.paragraph}>Effective date: November 14, 2018</p>

                    <p {... styles.paragraph}>Spoti-Vote ("us", "we", or "our") operates the https:\/\/spoti-vote.com website (the "Service").</p>

                    <p {... styles.paragraph}>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy for Spoti-Vote is managed through
                        <a href="https://www.freeprivacypolicy.com/free-privacy-policy-generator.php">Free Privacy Policy Website</a>.</p>

                    <p {... styles.paragraph}>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from https://spoti-vote.com</p>

                    <h2 {... styles.subTitle}>Information Collection And Use</h2>

                    <p {... styles.paragraph}>We collect several different types of information for various purposes to provide and improve our Service to you.</p>

                    <h3 {... styles.heading}>Types of Data Collected</h3>

                    <h4 {... styles.subHeading}>Personal Data</h4>

                    <p {... styles.paragraph}>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>

                    <ul {... styles.list}>
                        <li {... styles.listItem}>First name and last name</li>
                        <li {... styles.listItem}>Cookies and Usage Data</li>
                    </ul>

                    <h4 {... styles.subHeading}>Usage Data</h4>

                    <p {... styles.paragraph}>We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

                    <h4 {... styles.subHeading}>Tracking & Cookies Data</h4>
                    <p {... styles.paragraph}>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
                    <p {... styles.paragraph}>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p>
                    <p {... styles.paragraph}>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                    <p {... styles.paragraph}>Examples of Cookies we use:</p>
                    <ul {... styles.list}>
                        <li {... styles.listItem}>
                            <strong>Session Cookies.</strong>
                            We use Session Cookies to operate our Service.</li>
                        <li {... styles.listItem}>
                            <strong>Preference Cookies.</strong>
                            We use Preference Cookies to remember your preferences and various settings.</li>
                        <li {... styles.listItem}>
                            <strong>Security Cookies.</strong>
                            We use Security Cookies for security purposes.</li>
                    </ul>

                    <h2 {... styles.subTitle}>Use of Data</h2>

                    <p {... styles.paragraph}>Spoti-Vote uses the collected data for various purposes:</p>
                    <ul {... styles.list}>
                        <li {... styles.listItem}>To provide and maintain the Service</li>
                        <li {... styles.listItem}>To notify you about changes to our Service</li>
                        <li {... styles.listItem}>To allow you to participate in interactive features of our Service when you choose to do so</li>
                        <li {... styles.listItem}>To provide customer care and support</li>
                        <li {... styles.listItem}>To provide analysis or valuable information so that we can improve the Service</li>
                        <li {... styles.listItem}>To monitor the usage of the Service</li>
                        <li {... styles.listItem}>To detect, prevent and address technical issues</li>
                    </ul>

                    <h2 {... styles.subTitle}>Transfer Of Data</h2>
                    <p {... styles.paragraph}>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
                    <p {... styles.paragraph}>If you are located outside Austria and choose to provide information to us, please note that we transfer the data, including Personal Data, to Austria and process it there.</p>
                    <p {... styles.paragraph}>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                    <p {... styles.paragraph}>Spoti-Vote will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>

                    <h2 {... styles.subTitle}>Disclosure Of Data</h2>

                    <h3 {... styles.heading}>Legal Requirements</h3>
                    <p {... styles.paragraph}>Spoti-Vote may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                    <ul {... styles.list}>
                        <li {... styles.listItem}>To comply with a legal obligation</li>
                        <li {... styles.listItem}>To protect and defend the rights or property of Spoti-Vote</li>
                        <li {... styles.listItem}>To prevent or investigate possible wrongdoing in connection with the Service</li>
                        <li {... styles.listItem}>To protect the personal safety of users of the Service or the public</li>
                        <li {... styles.listItem}>To protect against legal liability</li>
                    </ul>

                    <h2 {... styles.subTitle}>Security Of Data</h2>
                    <p {... styles.paragraph}>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

                    <h2 {... styles.subTitle}>Service Providers</h2>
                    <p {... styles.paragraph}>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
                    <p {... styles.paragraph}>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

                    <h3 {... styles.heading}>Analytics</h3>
                    <p {... styles.paragraph}>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
                    <ul {... styles.list}>
                        <li {... styles.listItem}>
                            <p {... styles.paragraph}>
                                <strong>Google Analytics</strong>
                            </p>
                            <p {... styles.paragraph}>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.</p>
                            <p {... styles.paragraph}>You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.</p>
                            <p {... styles.paragraph}>For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page:
                                <a href="https://policies.google.com/privacy?hl=en">https://policies.google.com/privacy?hl=en</a>
                            </p>
                        </li>
                    </ul>

                    <h2 {... styles.subTitle}>Links To Other Sites</h2>
                    <p {... styles.paragraph}>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
                    <p {... styles.paragraph}>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>

                    <h2 {... styles.subTitle}>Children's Privacy</h2>
                    <p {... styles.paragraph}>Our Service does not address anyone under the age of 18 ("Children").</p>
                    <p {... styles.paragraph}>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>

                    <h2 {... styles.subTitle}>Changes To This Privacy Policy</h2>
                    <p {... styles.paragraph}>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                    <p {... styles.paragraph}>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p>
                    <p {... styles.paragraph}>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

                    <h2 {... styles.subTitle}>Contact Us</h2>
                    <p {... styles.paragraph}>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul {... styles.list}>
                        <li {... styles.listItem}>By email: office@spoti-vote.com</li>

                    </ul>
                </div>
                <div style={{
                    marginTop: '100px'
                }} id="cookiePolicy">

                    <h1 {... styles.title}>Cookie Policy for Spoti-Vote</h1>

                    <p {... styles.paragraph}>This is the Cookie Policy for Spoti-Vote, accessible from https://spoti-vote.com</p>

                    <p>
                        <strong {... styles.heading}>What Are Cookies</strong>
                    </p>

                    <p {... styles.paragraph}>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>

                    <p {... styles.paragraph}>For more general information on cookies see the Wikipedia article on HTTP Cookies.</p>

                    <p>
                        <strong {... styles.heading}>How We Use Cookies</strong>
                    </p>

                    <p {... styles.paragraph}>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>

                    <p>
                        <strong {... styles.heading}>Disabling Cookies</strong>
                    </p>

                    <p {... styles.paragraph}>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.</p>

                    <p {... styles.paragraph}>You can learn how to manage cookies on your web browser by following the
                        <a href="https://privacypolicies.com/blog/browser-cookies-guide/">Browser Cookies Guide</a>.</p>

                    <p>
                        <strong {... styles.heading}>The Cookies We Set</strong>
                    </p>

                    <ul {... styles.list}>

                        <li {... styles.listItem}>
                            <p>Login related cookies</p>
                            <p>We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.</p>
                        </li>

                    </ul>

                    <p>
                        <strong {... styles.heading}>Third Party Cookies</strong>
                    </p>

                    <p {... styles.paragraph}>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>

                    <ul {... styles.list}>

                        <li {... styles.listItem}>
                            <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</p>
                            <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>
                        </li>

                        <li {... styles.listItem}>
                            <p>The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.</p>
                            <p>For more information on Google AdSense see the official Google AdSense privacy FAQ.</p>
                        </li>

                    </ul>

                    <p>
                        <strong {... styles.heading}>More Information</strong>
                    </p>

                    <p {... styles.paragraph}>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. This Cookies Policy was created with the help of the Generator of
                        <a href="https://cookiepolicygenerator.com">GDPR Cookies Policy</a>.</p>

                    <p {... styles.paragraph}>However if you are still looking for more information then you can contact us through one of our preferred contact methods:</p>

                    <ul {... styles.list}>
                        <li {... styles.listItem}>Email: office@spoti-vote.com</li>

                    </ul>
                </div>
            </main>
        </div>);
    }
}

export default Policies;
