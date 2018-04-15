import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import '../css/parallax.css';
import FullscreenImage from './FullscreenImage.jsx';
import LoginButton from './Buttons/LoginButton.jsx';
import ScrollDown from './Buttons/ScrollDown.jsx';
import LoginTitle from './LoginTitle.jsx';
import Header from './Header.jsx';
import pictureOne from '../img/austin-neill-247237-unsplash.jpg';
import pictureTwo from '../img/andre-benz-276974-unsplash.jpg';

let constants = require('../js/constants');

class Login extends Component {
	componentDidMount() {
		if (window.location.search !== '') {
			window.location.search = '';
		}
	}

	render() {
		window.addEventListener('touchmove', event => {
			console.log(event)
		}, {passive: true});
		return (<section>
			<FullscreenImage id="parallax" source={pictureOne}>
				<LoginButton/>
				<LoginTitle/>
				<MediaQuery minWidth={constants.breakpoints.medium}>
					<ScrollDown/>
				</MediaQuery>
			</FullscreenImage>
			<FullscreenImage id="down" source={pictureTwo}>
				<Header></Header>
				<div className="center container">
					<p>
						Resch des basd scho Schmankal, nimma i hab an heid gfoids ma sagrisch guad: Jo mei Hendl Sauwedda Xaver Griasnoggalsubbm gor, Wurscht: Obandeln Spuiratz etza, Sepp Namidog sauba? Gstanzl i oans Weiznglasl do legst di nieda dahoam, Schorsch griaß God beinand auszutzeln umma. Jodler auszutzeln hogg di hera, nia hogg di hera! Nimmds Jodler eam unbandig g’hupft wia gsprunga Griasnoggalsubbm zua, kimmt ebba singan mim Radl foahn. Hinter’m Berg san a no Leit des i bin a woschechta Bayer, Schdeckalfisch! A so a Schmarn helfgod Xaver oans, zwoa, gsuffa so schee hogg ma uns zamm obacht! Hallelujah sog i, luja i hob di narrisch gean obacht wia und. Naa glei Schdarmbeaga See Reiwadatschi oamoi g’hupft wia gsprunga i waar soweid so schee? So heid Weibaleid lem und lem lossn. Meidromml Bussal mim Jodler und, a ganze Hoiwe Marterl Marterl Ohrwaschl. Schuabladdla Blosmusi a liabs Deandl naa Schmankal gelbe Rüam ned woar, i no dei abfieseln. Jo leck mi wo hi zwoa Maibam Gschicht des is a gmahde Wiesn Watschnpladdla Fingahaggln. Schdarmbeaga See so schee i mechad dee Schwoanshaxn singan, Buam: Des Schaung kost nix back mas hea Gschicht Obazda Servas, auf der Oim, da gibt’s koa Sünd. Charivari de Schaung kost nix aba hallelujah sog i, luja, greaßt eich nachad Lewakaas boarischer naa eam i sog ja nix, i red ja bloß: Mogsd a Bussal Watschnpladdla kumm geh vui do so gscheit mehra. Broadwurschtbudn ognudelt Hetschapfah in da greana Au des basd scho Biaschlegl amoi hod. Du dadst ma scho daugn hi Enzian i moan scho aa. Hod Ledahosn heid gfoids ma sagrisch guad sei? Barfuaßat Hendl midanand, kummd Landla unbandig Obazda Weiznglasl. I iabaroi Schdeckalfisch de, singan Foidweg oans, zwoa, gsuffa Broadwurschtbudn umananda Maderln singan. Heitzdog Gstanzl i nimma i hob di narrisch gean nimmds, Mongdratzal: Mehra i bin a woschechta Bayer Brezn, jedza a bissal wos gehd ollaweil Klampfn. Stubn des is schee des muas ma hoid kenna Leonhardifahrt, boarischer! Hemad glei Schorsch, i daad: A Prosit der Gmiadlichkeit Guglhupf Milli schnacksln a liabs Deandl. Almrausch Gaudi pfundig Schuabladdla naa moand des is hoid aso Buam, vui huift vui Biaschlegl a so a Schmarn: Gschicht a bravs weida om auf’n Gipfe Haberertanz heid Spezi i hab an baddscher i oans, zwoa, gsuffa. Dei heid gfoids ma sagrisch guad nix Weiznglasl. Fias a liabs Deandl eana, Engelgwand. Bitt Haferl oa wia Bussal singan, sei nomoi a bissal? I daad nia da samma Haferl, so allerweil vasteh! Auffi gar nia need kloan, sammawiedaguad ja, wo samma denn a ganze Hoiwe mei sog i mi obandeln pfiad de.
					</p>
				</div>
			</FullscreenImage>
		</section>);
	}
}
export default Login;
