import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tips = [];
  todaysTip1: string;
  todaysTip2: string;
  todaysTip3: string;

  constructor(public navCtrl: NavController) {
    this.tips = ['You should try and drink 64 ounces of water a day, or 8 glasses!',
      'You should try and eat less than 2000 calories a day!',
      'Walking 10,000 steps a day, burns a pound of fat a week!',
      ' “Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart.” – Steve Jobs',
      '“You can’t use up creativity. The more you use, the more you have.” – Maya Angelou',
      '“I always did something I was a little not ready to do. I think that’s how you grow. When there’s that moment of, ‘Wow, I’m not really sure I can do this,’ and you push through those moments, that’s when you have a breakthrough.” – Marissa Mayer',
      '“I have not failed. I’ve just found 10,000 ways that won’t work.” – Thomas Edison',
      ' “Do not go where the path may lead, go instead where there is no path and leave a trail.” – Ralph Waldo Emerson',
      '“You gotta run more than your mouth to escape the treadmill of mediocrity. A true hustler jogs during the day, and sleepwalks at night.” – Jarod Kintz',
      '“Lift up the weak; inspire the ignorant. Rescue the failures; encourage the deprived! Live to give. Don’t only hustle for survival. Go, and settle for revival!” – Israelmore Ayivor',
      '“Things work out best for those who make the best of how things work out.” – John Wooden',
      '“If you are not willing to risk the usual, you will have to settle for the ordinary.” – Jim Rohn',
      '“You can’t have a million-dollar dream with a minimum-wage work ethic.” – Stephen C. Hogan',
      '“I will tell you the secret to getting rich on Wall Street. You try to be greedy when others are fearful. And you try to be fearful when others are greedy.” – Warren Buffett',
      '“What we really want to do is what we are really meant to do. When we do what we are meant to do, money comes to us, doors open for us, we feel useful, and the work we do feels like play to us.” – Julia Cameron',
      '“It’s not the employer who pays the wages. Employers only handle the money. It’s the customer who pays the wages.” – Henry Ford',
      '“If you don’t value your time, neither will others. Stop giving away your time and talents. Value what you know & start charging for it.” – Kim Garst',
      '“Fortune sides with him who dares.” – Virgil',
      '“Don’t tell me where your priorities are. Show me where you spend your money and I’ll tell you what they are.” — James W. Frick'];
    this.todaysTip1 = this.tips[Math.floor(Math.random() * this.tips.length)];
    this.todaysTip2 = this.tips[Math.floor(Math.random() * this.tips.length)];
    this.todaysTip3 = this.tips[Math.floor(Math.random() * this.tips.length)];
  }

}
