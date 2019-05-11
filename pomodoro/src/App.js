import React, {Component, Fragment} from 'react';

import './assets/scss/base.scss';
import beep from './assets/audio/freesound_pan14_tone-beep.mp3';
//import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

class Row extends Component {
	render() {
		var hasID = (this.props.id !== undefined && this.props.id !== '');
		return (
			<div className={'row ' + this.props.classes} 
			{...(hasID && { id: this.props.id})} >
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
function Error(props) {
	return (
		<p id={props.fieldID + '-error'}>{props.text}</p>
	);
}
/* 
	Length control (including input and buttons and label)
	
	To do: make it so input name and id are one prop/only use ID and not name
*/
class LengthControl extends Component {
	constructor(props) {
		super(props);
		
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	
	onChange(event) {
		this.props.onChange(event);
	}
	
	onClick(event) {
		let button = event.target.closest('button'),
			buttonField = button.getAttribute('aria-controls'),
			className = button.className,
			newValue = (className == 'plus') ? (this.props.lengthState.value + 1) : (this.props.lengthState.value - 1);
		
		if (newValue > 0 && newValue <= this.props.max) {
			this.props.setLength(buttonField, newValue);
		}
			
		
	}
	
	render() {
		//<Input fieldName={this.props.fieldID} fieldID={this.props.fieldID} fieldType="number" includeLabel={false} max={this.props.max} />
		// <input name={this.props.fieldName} id={this.props.fieldID} type="number" min="1" max={this.props.max} />
		var max = this.props.max,
			showError = this.props.lengthState.showError,
			fieldID = this.props.fieldID,
			periodNameLower = this.props.periodName.toLowerCase(),
			isMax = (this.props.lengthState.value == max),
			isMin = (this.props.lengthState.value == 1), 
			error = (showError) ? <Error fieldID={fieldID} text={'Please enter a number between 1 and ' + max} /> : '';
		return (
			<Fragment>
				<label htmlFor={this.props.fieldID}>{this.props.periodName + ' length (minutes)'}</label>
				<div className="container">
					<div className="wrap">
						<CellContainer classes="">
							<Input 
								fieldName={this.props.fieldName} 
								fieldID={this.props.fieldID} 
								fieldType="number"
								value={this.props.lengthState.value} 
								includeLabel={false} 
								max={max}
								onChange={this.onChange}
								{...
									(showError && {
										'aria-describedby': fieldID + '-error',
										
										
									})
								} 
							/>
							
							
						</CellContainer>
						<CellContainer classes="buttons">
							
							<Button 
								classes="plus" 
								icon={<Icon iconSlug="plus" />} 
								text={"Subtract minute from " + periodNameLower} 
								ariaControls={this.props.fieldID}
								isDisabled={isMax}
								onClick={this.onClick}
							/ >
							<Button 
								classes="minus" 
								isDisabled={isMin}
								icon={<Icon iconSlug="minus" />} 
								text={"Add minute to " + periodNameLower} 
								ariaControls={this.props.fieldID}
								onClick={this.onClick}
							/ >	
						</CellContainer>	
						
					
					</div>
				</div>
			</Fragment>
		);
	}
}
/*
const icons = {
	plus: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M256 144V32c0-17.673 14.327-32 32-32s32 14.327 32 32v112h-64zm112 16H16c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h16v32c0 77.406 54.969 141.971 128 156.796V512h64v-99.204c73.031-14.825 128-79.39 128-156.796v-32h16c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zm-240-16V32c0-17.673-14.327-32-32-32S64 14.327 64 32v112h64z"/></svg>,
	minus: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
};
*/

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
	constructor(props) {
		super(props);
		
		this.onChange = this.onChange.bind(this);
	}
	onChange(event) {
		this.props.onChange(event);
	}
	render() {
		var isNumber = (this.props.fieldType === 'number'),
			hasChangeFunction = (this.props.onChange !== undefined),
			label = (this.props.includeLabel) ? <label htmlFor={this.props.fieldID}>{this.props.labelText}</label> : "";
		
		return (
			<Fragment>
			{label}
			<input 
				type={this.props.fieldType} 
				name={this.props.fieldName} 
				id={this.props.fieldID} 
				
				{...
					(isNumber && {
						'min': 1,
						max: this.props.max,
						value: this.props.value,
						onBlur: this.onChange
					
						
					})
				}
				{...
					((isNumber || hasChangeFunction) && {
						
						onChange: this.onChange
						
					})
				}
				/>
				
			</Fragment>	
		);
	}
}

class Button extends Component {
/*
	constructor(props) {
		super(props);
		
		
		
		
	}
*/
	// This is rendering when checkbox changes and shouldn't be probably
	// If possible only want to rerender if state (disabled) changes
	render() {
		console.log('render button');
		var icon = this.props.icon,
			hasClick = (this.props.onClick !== undefined && this.props.onClick != ''),
			ariaDescribedBy = this.props.ariaDescribedBy,
			hasAriaDescribedBy = (ariaDescribedBy !== undefined && ariaDescribedBy != ''),
			isTextVisible = (this.props.isTextVisible === undefined) ? true : this.props.isTextVisible,
			ariaControls = this.props.ariaControls,
			hasAriaControls = (ariaControls !== undefined && ariaControls != '') ? true : false,
			// If there's an icon, use hidden text
			text = (this.props.isTextVisible) ? this.props.text : <HiddenClass text={this.props.text} />;
			
		return (
			<button 
				className={this.props.classes} 
				type="button" 
				{...(hasAriaControls && {'aria-controls': ariaControls}) 
					
				}
				{...(hasAriaDescribedBy && {'aria-describedby' : ariaDescribedBy})}
				{...(hasClick && {onClick: this.props.onClick})}
				{...(this.props.isDisabled && {'disabled':'disabled'})}
			>
				{icon}
				{text}
			</button>
		);
	}
}
/* 
	A button containing visible text
*/
/*
class TextButton extends Component {
	render() {
		<Button 
		icon={this.props.icon} isTextVisible={true} text={this.props.text} hasAriaControls={this.props.hasAriaControls} />
	}
}
*/

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
function Container(props) {
	return (<div className="container">{props.children}</div>);
}
class Settings extends Component {
	constructor(props) {
		super(props);
		
		
		this.onChange = this.onChange.bind(this);
		
	}
	onChange(event) {
		this.props.onChange(event);
	}

	render() {
		console.log(this.props.onAudioClick);
		return (
		
			<form className="row settings" aria-labelledby="settings-heading">
				<Row classes="length-controls">
					<Column>
						<LengthControl 
							fieldID="breakLength" 
							fieldName="breakLength" 
							periodName="Break"
							onChange={this.onChange}
							setLength={this.props.setLength}
							lengthState = {this.props.breakLength}
							max={this.props.maxLengths['breakLength']} 
						/>
					</Column>
					<Column>
						<LengthControl 
							fieldID="sessionLength" 
							fieldName="sessionLength" 
							periodName="Session"
							onChange={this.onChange}
							setLength={this.props.setLength}
							lengthState = {this.props.sessionLength}
							max={this.props.maxLengths['sessionLength']}
						/>
					</Column>
				</Row>
				<Row>
					<Column>
						<Fieldset legend="Audio">
							<Container>
								<Input fieldType="checkbox" fieldID="mute-audio" includeLabel={true} labelText="" fieldName="isMuted" labelText="Mute Audio (beep at the end of each session and break)" onChange={this.onChange} />
							</Container>
							<Container>
								<Button text="Test Audio" isTextVisible={true} ariaDescribedBy="beep-text" onClick={this.props.onAudioClick} />
								<p id="beep-text">Plays beep once (even when muted)</p>
							</Container>
						</Fieldset>
					</Column>
					<Column>
						
						<Input fieldType="checkbox" fieldID="show-progress" includeLabel={true} labelText="Show Progress Bar" fieldName="showProgressBar" onChange={this.onChange} />
						
					</Column>
				</Row>
			</form>
			
		);
	}
}
function Section (props) {
	return (
		<section id={props.ID} aria-labelledby={props.ariaLabelledBy}>
			{props.children}
		</section>	
	);
}
class Checkbox extends Component {
	
}
class PomodoroTimer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength: {value: 5, showError: false},
			sessionLength: {value: 25, showError: false},
			isBreak: false,
			isPaused: true,
			timeRemaining: 0,
			isMuted: false,
			showProgressBar: false
			
		}
		this.audio = React.createRef();
		this.handleChange = this.handleChange.bind(this);
		this.setLength = this.setLength.bind(this);
		this.playAudio = this.playAudio.bind(this);
	}
	/* 
		Set length of a period
	*/
	setLength(period, value) {
		this.setState({
			[period]: {value:value}
		});
	}

	handleChange(event) {
		
		// Field that changed
		var field = event.target.closest('input'),
			// Whether field is checkbox
			isCheckbox = (field.type == 'checkbox'),
			name = field.name,
			// Checkbox has boolean value
			value = (isCheckbox) ? field.checked : field.value,
			// Value to set for state (length fields have two states stored as object properties)
			stateValue = (isCheckbox) ? value : {};
			
		// Length fields blur: Check max length
		if (!isCheckbox && event.type == 'blur') {
			// Max length for this field
			var maxLength = this.props.maxLengths[name],
				// Should be at least 1 but less than the max
				isValid = (value >= 1 && value <= maxLength);
			// Invalid	
			if (!isValid) {
				// If less than one, set 1; if over max, set to max
				value = (value < 0) ? 1 : maxLength;
			}
			stateValue = {
				value: value,
				showError: isValid
			};
		// Length fields change: Just update value, wait for blur to	
		} else if (!isCheckbox) {
			stateValue = {
				value: value
			};
		}
		this.setState({
			[name]: stateValue
		});	
			
	}
	handleCheckboxChange(event) {
		var field = event.target.closest('input');
	}
	playAudio(bypassMute) {
		bypassMute = (bypassMute === undefined) ? false : bypassMute;
		if (!this.state.isMuted || bypassMute) {
			console.log(this.audio);
			this.audio.current.play();
		}
	}
	render() {
		return (
			<main id="timer">
				<Audio ID="beep" fileName={beep} ref={this.audio} />
				<h1>Pomodoro Timer</h1>
				<Settings 
					onChange={this.handleChange}
					maxLengths={this.props.maxLengths}
					sessionLength = {this.state.sessionLength}
					breakLength = {this.state.breakLength}
					setLength={this.setLength}
					onAudioClick={this.playAudio}
				/>
				<Timer />
			</main>
		);
		
	}
}
// Ref to its own dom node
// Then in parent ref to this
class Audio extends Component {
	constructor(props) {
		super(props);
		this.audioRef = React.createRef();
		this.play = this.play.bind(this);
	}
	
	play() {
		console.log(this.audioRef);
		this.audioRef.current.play();
	}
	render() {
		return (
			<audio id={this.props.ID} ref={this.audioRef}>
				<source src={this.props.fileName} type="audio/mpeg" />
			</audio>	
		);
	}
}
/* 
	<audio id="beep">
		<source src="assets/audio/freesound_pan14_tone-beep.mp3" type="audio/mpeg">
	</audio>
*/
class Timer extends Component {
	render() {
		return (
			<Section ID="progress" ariaLabelledBy="timer-heading">
				<h2 id="timer-heading">Timer</h2>
				<Row>
					<Column>
						<Button isTextVisible={true} ariaControls="timer-container" text="Start timer" />
						<Button isTextVisible={true} text="Clear timer" />
					</Column>
				</Row>
				<Row id="timer-container">
					<Countdown timeRemaining={'00:25:00'} />
					
				</Row>
			</Section>
		
			
		)
	}
}
class Countdown extends Component {
	render() {
		
		return (
			<div id="count" role="timer" aria-live="off">
				{this.props.timeRemaining}
			</div>	
		)
	}
}
function App() {
	const periodMaxLengths = {sessionLength: 120, breakLength: 60};
	return (
		<div className="container flex-container">
			<PomodoroTimer maxLengths={periodMaxLengths} />
		</div>
	);
}

export default App;
