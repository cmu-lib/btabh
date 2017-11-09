import React, { Component } from 'react'
import { extend } from 'lodash'
import './index.css'

class About extends Component {
	constructor(){
    super();
    this.state ={data: true};
  }
	btnClick(){
 this.setState(prevState => ({data: !prevState.data}));
}

		render(){
  return (
    <div>
      <header>
			<button onClick={this.btnClick.bind(this)}>{this.state.data ? 'EN' : 'RU'}</button>
      </header>

      <main>
			 {this.state.data ? 'At 63, Tolstoy set out to write a list of a hundred books that had made a deep impression on him. But compiling the list was slow going: it was not so easy to remember which books had been significant, and when. Some remained clear in his memory: "Childhood to about 14 years old: The story of Joseph in the Bible...Pushkin\'s poems. 14 to 20 years old: The Gospel of Matthew: Sermon on the Mount...Rousseau Confessions...Schiller\'s The Robbers" and so on. But in the end his list numbered only around fifty titles—a small fraction of the many works he had read and contemplated throughout his long life. \n\n Beyond the Ant Brotherhood aims to pick up where Tolstoy left off, to vastly expand the list he began to compile. This project will assemble a database that catalogues the multitude of works that shaped, in one way or another, Tolstoy\'s intellectual life. It will also create a visualization of Tolstoy\'s network of interlocutors, the many friends and colleagues with whom he corresponded about literature, politics, and philosophy. In addition to being an avid reader, Tolstoy was a meticulous chronicler, and thanks to his own efforts, as well as those of his friends and family, there is a wealth of information about what Tolstoy read, when read it, and what he thought about it. At the moment, this information is difficult to retrieve. His citations and impressions are dispersed across volumes of diaries and letters, as well as accounts written by others. Tracking down a single reference can take hours, and forming a broad impression of the type of reading Tolstoy was doing at a particular time requires dedicated research that only a specialist is likely to undertake. Although Tolstoy\'s diaries and letters have been made accessible through extremely impressive and useful efforts to digitize his works, these materials have not been collated in a way that allows for easy search and analysis. Beyond the Ant Brotherhood will organize, parse, and index these various materials, enabling them to be searched according to dates, places, events, and names of individuals. A reader curious about Tolstoy\'s thoughts on Jean-Jacque Rousseau will able to find instantly all mentions of Rousseau in all of Tolstoy\'s diaries and correspondence. A scholar trying to figure out which philosophical works Tolstoy studied as he wrote the epilogue to War and Peace could examine Tolstoy\'s reading over these months. If he wants to know when Tolstoy became interested in a particular book, idea, or person, he can search for these terms and compare how frequently they come up in this or that span of time. Our project seeks not only to assist scholars in pursing their research, but also to offer a more comprehensive picture of Tolstoy\'s intellectual life to all students and readers of Tolstoy. We hope that in searching through Tolstoy\'s many extra-literary works, readers will come across insights no less profound, humorous, or outrageous than in any of Tolstoy\'s great novels.' : 'Пустая страница, заполняемая информацией BTABH'}

      </main>

      <footer>
			
			{this.state.data ? 'Copyright message here' : 'Сообщение об авторских правах здесь'}
      </footer>
    </div>
  );
}
}

export default About;
