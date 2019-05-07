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
								icon={<Icon iconSlug="plus" />} 
								text={"Subtract minute from " + periodNameLower} 
								ariaControls={this.props.fieldID}
							/ >
							<Button 
								classes="plus" 
								icon={<Icon iconSlug="minus" />} 
								text={"Add minute to " + periodNameLower} 
								ariaControls={this.props.fieldID}
							/ >	
						</CellContainer>	
						
					
					</div>
				</div>
			</Fragment>
		);
	}
}
const icons = {
	plus: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M256 144V32c0-17.673 14.327-32 32-32s32 14.327 32 32v112h-64zm112 16H16c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h16v32c0 77.406 54.969 141.971 128 156.796V512h64v-99.204c73.031-14.825 128-79.39 128-156.796v-32h16c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zm-240-16V32c0-17.673-14.327-32-32-32S64 14.327 64 32v112h64z"/></svg>,
	minus: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
};

class Icon extends Component {
	constructor(props) {
		super(props);
		// To do: Only set aria-hidden="true" once
		this.icons = {
			plus: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>,
			minus: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
		};
	}
	render() {
		
		return(
			this.icons[this.props.iconSlug]
		);
	}
}
class Input extends Component {
	render() {
		var isNumber = (this.props.fieldType === 'number');
		return (
			<input 
				type={this.props.fieldType} 
				name={this.props.fieldName} 
				id={this.props.fieldID}  
				{...
					(isNumber && {
						'min': 1,
						max: this.props.max
						
					})
				} />
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
class Fieldset extends Component {
	render() {
		return (
			<fieldset>
				<legend>{this.props.legend}</legend>
				{this.props.children}
			</fieldset>
		)
	}
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
					<Column>
						<LengthControl fieldID="ssnNum" fieldName="sessionLength" periodName="Session" max="120" />
					</Column>
				</Row>
				<Row>
					<Column>
						<Fieldset legend="Audio">
							
						</Fieldset>
					</Column>
				</Row>
			</form>
		);
	}
}
class Checkbox extends Component {
	
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
