import React from 'react';
// import logo from './logo.svg';
import './App.css';
const keyboardJS = require('keyboardjs')
const facts = require('./facts.json');
const consumption_data = require('./consumption_data.json');

class App extends React.Component {
  constructor(props){
    super(props);
    this.start_time = 0;
    const stored_time = localStorage.getItem("current_time")
    if(stored_time){
      this.start_time = parseInt(stored_time);
    }
    this.state = {
      current_time: this.start_time, 
      show_knowledge: false, 
      current_fact: Object.keys(facts).length - 1
    }
    console.log(this.state.current_fact);
  }

  componentDidMount(){
    // The water/energy consumption data (numbers) is updated every 2 seconds.
    setInterval(()=>{
      const new_time = this.state.current_time + 1;
      this.setState({current_time: new_time});
      localStorage.setItem("current_time", new_time)

      // show knowledge screen every 40 seconds/20 periods
      if(new_time % 20 === 0){
        // there are 15 different images
        const new_fact = (this.state.current_fact + 1) % Object.keys(facts).length;
        console.log(new_fact)
        this.setState({
          show_knowledge: true, 
          current_fact: new_fact
        });
      }

      // hide knowledge screen after 6 seconds/3 periods
      if(new_time % 20 === 8){
        this.setState({show_knowledge: false});
      }
      console.log("tick")
    }, 2000)

    keyboardJS.bind('d', ()=>{
      // reset localStorage with keypress d
      console.log("reset local storage counter to 0")
      this.setState({current_time: 0});
      localStorage.setItem("current_time", 0)
    });
    
  }

  render(){
    const show_knowledge = this.state.show_knowledge;
    const current_fact = this.state.current_fact;

    const time = this.state.current_time;
    const water = Math.min(Math.round(consumption_data["water"] * time), 999999);
    const energy = Math.min(Math.round(consumption_data["energy"] * time), 999999);
    const co2 = Math.min(Math.round(consumption_data["co2"] * time), 999999);
    const car_wash = Math.min(Math.round(consumption_data["car_wash"] * time), 9999);
    const swiss_household = Math.min(Math.round(consumption_data["swiss_household"] * time), 9999);
    const return_flights = Math.min(Math.round(consumption_data["return_flights"] * time), 9999);

    return (
      <div className="App">
        {show_knowledge ? <KnowledgeView fact_id={current_fact} /> 
        :
        <CounterView 
            water={water} 
            energy={energy} 
            co2={co2} 
            car_wash={car_wash} 
            swiss_household={swiss_household} 
            return_flights={return_flights} />
        }
      </div>
    );
  }
}

export default App;

function CounterView(props){
  const {water, energy, co2, car_wash, swiss_household, return_flights} = props;

  return(
    <div className="counter_view">
        <div className="counter_headline">{/*À aujourd'hui, grâce à vous, nous avons économisé:*/}</div>
        <div className="column_container">
          <div className="counter_column">
            <div className="counter_icon1"></div>
            <div className="counter_text" style={{left: "40px"}}>
              {water}<span className="counter_text_small">litres</span>
            </div>
            <div className="counter_equal">{/*=*/}</div>
            <div className="counter_icon1b"></div>
            <div className="counter_textb" style={{marginRight: "430px"}}>
              {car_wash}
            </div>
          </div>

          <div className="counter_column">
            <div className="counter_icon2"></div>
            <div className="counter_text" style={{left: "45px"}}>
              {energy}<span className="counter_text_small">kWh</span>
            </div>
            <div className="counter_equal">{/*=*/}</div>
            <div className="counter_icon2b"></div>
            <div className="counter_textb" style={{marginRight: "445px"}}>
              {swiss_household}
            </div>
          </div>

          <div className="counter_column">
            <div className="counter_icon3"></div>
            <div className="counter_text" style={{left: "-5px"}}>
              {co2}<span className="counter_text_small">kg</span>
            </div>
            <div className="counter_equal">{/*=*/}</div>
            <div className="counter_icon3b"></div>
            <div className="counter_textb" style={{marginRight: "470px"}}>
              {return_flights}
            </div>
          </div>
        </div>
    </div>
  )
}

function KnowledgeView(props){
  const {fact_id} = props;
  const {en_text, fr_text, source, illustration} = facts[fact_id];

  return (
    <div className="knowledge_view">
      <div className="text_container">
        <div className="fr_text">
          {fr_text}
        </div>
        <div className="en_text">
          {en_text}
        </div>
        <div className="source">
          Source: {source}
        </div>
      </div>
      <div className="illustration_container">
        <img src={`/illustrations/${illustration}`} alt={`for fact ${fact_id}`} />
      </div>
    </div>
  )
}