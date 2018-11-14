import React from 'react';
import {css} from 'glamor';

import Header from '../components/Login/Header.jsx';

const constants = require('../js/constants');
const styles = {
    main: css({backgroundColor: constants.colors.background, maxHeight: '100vh', maxWidth: '100vw'}),
    wrapper: css({color: 'white', margin: '50px, 2em'}),
    title: css({fontSize: '2em'}),
    subTitle: css({fontSize: '1.7em'}),
    heading: css({fontSize: '1.5em'}),
    subHeading: css({fontSize: '1.2em'}),
    paragraph: css({fontSize: '1em', margin: '5px 0'})
};
class Policies extends React.Component {
    render() {
        return (<div {... styles.main}>
            <Header/>
            <main {... styles.wrapper}>
                <h1 {... styles.title}>Privacy Policy</h1>

                <p {... styles.paragraph}>Effective date: November 14, 2018</p>

                <p {... styles.paragraph}>Spoti-Vote ("us", "we", or "our") operates the https://spoti-vote.com website (the "Service").</p>

                <p {... styles.paragraph}>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy for Spoti-Vote is managed through
                    <a href="https://www.freeprivacypolicy.com/free-privacy-policy-generator.php">Free Privacy Policy Website</a>.</p>

                <p {... styles.paragraph}>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from https://spoti-vote.com</p>

                <h2 {... styles.subTitle}>Information Collection And Use</h2>

                <p {... styles.paragraph}>We collect several different types of information for various purposes to provide and improve our Service to you.</p>

                <h3 {... styles.heading}>Types of Data Collected</h3>

                <h4 {... styles.subHeading}>Personal Data</h4>

                <p {... styles.paragraph}>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>

                <ul>
                    <li>First name and last name</li>
                    <li>Cookies and Usage Data</li>
                </ul>

                <h4 {... styles.subHeading}>Usage Data</h4>

                <p {... styles.paragraph}>We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

                <h4 {... styles.subHeading}>Tracking & Cookies Data</h4>
                <p {... styles.paragraph}>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
                <p {... styles.paragraph}>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p>
                <p {... styles.paragraph}>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                <p {... styles.paragraph}>Examples of Cookies we use:</p>
                <ul>
                    <li>
                        <strong>Session Cookies.</strong>
                        We use Session Cookies to operate our Service.</li>
                    <li>
                        <strong>Preference Cookies.</strong>
                        We use Preference Cookies to remember your preferences and various settings.</li>
                    <li>
                        <strong>Security Cookies.</strong>
                        We use Security Cookies for security purposes.</li>
                </ul>

                <h2 {... styles.subTitle}>Use of Data</h2>

                <p {... styles.paragraph}>Spoti-Vote uses the collected data for various purposes:</p>
                <ul>
                    <li>To provide and maintain the Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                    <li>To provide customer care and support</li>
                    <li>To provide analysis or valuable information so that we can improve the Service</li>
                    <li>To monitor the usage of the Service</li>
                    <li>To detect, prevent and address technical issues</li>
                </ul>

                <h2 {... styles.subTitle}>Transfer Of Data</h2>
                <p {... styles.paragraph}>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
                <p {... styles.paragraph}>If you are located outside Austria and choose to provide information to us, please note that we transfer the data, including Personal Data, to Austria and process it there.</p>
                <p {... styles.paragraph}>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
                <p {... styles.paragraph}>Spoti-Vote will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>

                <h2 {... styles.subTitle}>Disclosure Of Data</h2>

                <h3 {... styles.heading}>Legal Requirements</h3>
                <p {... styles.paragraph}>Spoti-Vote may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                <ul>
                    <li>To comply with a legal obligation</li>
                    <li>To protect and defend the rights or property of Spoti-Vote</li>
                    <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                    <li>To protect the personal safety of users of the Service or the public</li>
                    <li>To protect against legal liability</li>
                </ul>

                <h2 {... styles.subTitle}>Security Of Data</h2>
                <p {... styles.paragraph}>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

                <h2 {... styles.subTitle}>Service Providers</h2>
                <p {... styles.paragraph}>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
                <p {... styles.paragraph}>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

                <h3 {... styles.heading}>Analytics</h3>
                <p {... styles.paragraph}>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
                <ul>
                    <li>
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
                <ul>
                    <li>By email: office@spoti-vote.com</li>

                </ul>
            </main>
        </div>);
    }
}

export default Policies;
