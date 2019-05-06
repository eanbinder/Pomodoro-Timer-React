import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './assets/scss/base.scss';
//import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

class Row extends Component {
	render() {
		return (
			<div className={'row ' + this.props.classes} >
				{this.props.children}
			</div>
		);
	}
}
class Column extends Component {
	render () {
		return (
			<div className="column">
				{this.props.children}
			</div>	
		)
	}
}
class LengthControl extends Component {
	constructor(props) {
		super(props);
		
		this.handleLengthChange = this.handleLengthChange.bind(this);
	}
	
	handleLengthChange(event) {
		this.props.handleLengthChange(event);
	}
	
	render() {
		var periodNameLower = this.props.periodName.toLowerCase();
		return (
			<Fragment>
				<label htmlFor={this.props.fieldID}>{this.props.periodName + ' length (minutes)'}</label>
				<div className="container">
					<div className="wrap">
						<CellContainer classes="">
							<input name={this.props.fieldName} id={this.props.fieldID} type="number" min="1" max={this.props.max} />
							
						</CellContainer>
						<CellContainer classes="buttons">
							<Button 
								classes="plus" 
								icon={<PlusIcon />} 
								text={"Add minute to " + periodNameLower} 
								ariaControls={this.props.fieldID}
							/ >
							<Button 
								classes="plus" 
								icon={<PlusIcon />} 
								text={"Subtract minute from " + periodNameLower} 
								ariaControls={this.props.fieldID}
							/ >	
						</CellContainer>	
						
					
					</div>
				</div>
			</Fragment>
		);
	}
}
class Icon extends Component {
	render() {
		return(
			<i className={'fa ' + this.props.iconClass} aria-hidden="true"></i>
		);
	}
}
class PlusIcon extends Component {
	render() {
		return(
			<Icon iconClass="fa-plus"/>
		);
	}
}

class MinusIcon extends Component {
	render() {
		return(
			<Icon iconClass="fa-minus"/>
		);
	}
}
class Button extends Component {
	constructor(props) {
		super(props);
		
		
		
		
	}
	render() {
		var icon = this.props.icon,
			isTextVisible = (this.props.isTextVisible === undefined) ? true : this.props.isTextVisible,
			ariaControls = this.props.ariaControls,
			hasAriaControls = (ariaControls !== undefined && ariaControls != '') ? true : false,
			// If there's an icon, use hidden text
			text = (this.props.isTextVisible) ? this.props.text : <HiddenClass text={this.props.text} />;
			
			console.log(hasAriaControls);
		return (
			<button className={this.props.classes} type="button" {...(hasAriaControls && {'aria-controls': ariaControls})}>
				{icon}
				{text}
			</button>
		);
	}
}

function HiddenClass(props) {
	return (
		<span className="vh">{props.text}</span>
	);
}

function CellContainer (props) {
	return (
		<div className={'cell ' + props.classes}>{props.children}</div>
	)
}
class Settings extends Component {
	constructor(props) {
		super(props);
		
		
		this.handleLengthChange = this.handleLengthChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}
	handleLengthChange(event) {
		
	}
	handleCheckboxChange(event) {
		
	}
	render() {
		return (
			<form className="row settings" aria-labelledby="settings-heading">
				<Row classes="length-controls">
					<Column>
						<LengthControl fieldID="brkNum" fieldName="breakLength" periodName="Break" max="60" />
					</Column>
					<Column></Column>
				</Row>
				<Row>
				</Row>
			</form>
		);
	}
}
class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength: 5,
			sessionLength: 25
		}
		this.handleLengthChange = this.handleLengthChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	handleLengthChange(event) {
		
	}
	handleCheckboxChange(event) {
		
	}
	render() {
		return (
			<main id="timer">
				<h1>Pomodoro Timer</h1>
				<Settings />
				
			</main>
		);
		
	}
}
function App() {
	return (
		<div className="container flex-container">
			<Timer />
		</div>
	);
}

export default App;
