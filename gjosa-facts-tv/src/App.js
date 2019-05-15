import React from 'react';
import logo from './logo.svg';
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

      // show knowledge screen every 30 seconds/15 periods
      if(new_time % 15 === 0){
        // there are 15 different images
        const new_fact = (this.state.current_fact + 1) % Object.keys(facts).length;
        console.log(new_fact)
        this.setState({
          show_knowledge: true, 
          current_fact: new_fact
        });
      }

      // hide knowledge screen after 6 seconds/3 periods
      if(new_time % 15 === 5){
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
    const water = Math.round(consumption_data["water"] * time);
    const energy = Math.round(consumption_data["energy"] * time);
    const co2 = Math.round(consumption_data["co2"] * time);
    const car_wash = Math.round(consumption_data["car_wash"] * time);
    const swiss_household = Math.round(consumption_data["swiss_household"] * time);
    const return_flights = Math.round(consumption_data["return_flights"] * time);

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
        <div className="counter_headline">À aujourd'hui, grâce à vous, nous avons économisé:</div>
        <div className="column_container">
          <div className="counter_column">
            <div className="counter_icon1"></div>
            <div className="counter_text">
              {water}<span className="counter_text_small">litres</span>
            </div>
            <div className="counter_equal">=</div>
            <div className="counter_icon1b"></div>
            <div className="counter_textb">
              {car_wash} lavages auto
            </div>
          </div>

          <div className="counter_column">
            <div className="counter_icon2"></div>
            <div className="counter_text">
              {energy}<span className="counter_text_small">kWh</span>
            </div>
            <div className="counter_equal">=</div>
            <div className="counter_icon2b"></div>
            <div className="counter_textb">
              {swiss_household} foyers Suisses/ an
            </div>
          </div>

          <div className="counter_column">
            <div className="counter_icon3"></div>
            <div className="counter_text">
              {co2}<span className="counter_text_small">kg</span>
            </div>
            <div className="counter_equal">=</div>
            <div className="counter_icon3b"></div>
            <div className="counter_textb">
              {return_flights} vols d’avion
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