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
			 {this.state.data ? 'Blank page to be filled with BTABH info' : 'Пустая страница, заполняемая информацией BTABH'}

      </main>

      <footer>
			{this.state.data ? 'Copyright message here' : 'Сообщение об авторских правах здесь'}
      </footer>
    </div>
  );
}
}

export default About;
