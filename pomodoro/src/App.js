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
			includeLabel = (this.props.includeLabel === undefined) ? true : this.props.includeLabel,
			label = (includeLabel) ? <label htmlFor={this.props.fieldID}>{this.props.labelText}</label> : "";
		
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
		//console.log('render button');
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
						<Input fieldType="checkbox" fieldID="test-mode" fieldName="isTestMode" labelText="Test mode (6 second break and 8 second session)" onChange={this.onChange} />
						
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
			isMuted: false,
			showProgressBar: false,
			isTestMode: false
			
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
		console.log('setLength');
		console.log(this.state);
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
					sessionLength={this.state.sessionLength}
					breakLength={this.state.breakLength}
					setLength={this.setLength}
					onAudioClick={this.playAudio}
				/>
				<Timer
					sessionLength={this.state.sessionLength.value}
					breakLength={this.state.breakLength.value}	
					isMuted={this.state.isMuted}
					showProgressBar={this.state.showProgressBar}
					isTestMode={this.state.isTestMode}
								
				/>
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
	
	constructor(props) {
		super(props);
		this.getMillisecondsTotal = this.getMillisecondsTotal.bind(this);
		
		let totalTime = this.getMillisecondsTotal(false, false);
		
		this.state = {
			isBreak: false,
			isPaused: true,
			intervalID: 0,
			totalTime: totalTime,
			hasStarted: false,
			timeRemaining: {}
		};
		
		
		this.getEndTime = this.getEndTime.bind(this);
		this.playPause = this.playPause.bind(this);
		this.clear = this.clear.bind(this);
		this.update = this.update.bind(this);
		this.start = this.start.bind(this);
		
		this.updateTotal = this.updateTotal.bind(this);
		this.clear = this.clear.bind(this);
		this.stop = this.stop.bind(this);
		this.getTimeRemaining = this.getTimeRemaining.bind(this);
		
		// End time: Will need to be updated right away, so make it an instance property and not state
		this.endTime = this.getEndTime(false);
		// Time left
		this.state.timeRemaining = this.getTimeRemaining();
		
	}
	/* 
		pom.addMinutes
		
		Adds the given number of minutes to the current date and returns that date object (representing m minutes from now)
		
		@param: m (number): How many minutes in the future
	*/
	addMinutes(m){
		//adds minutes m to get an end Date
		 var potato = new Date();
		 return new Date(potato.getTime() + (m * 60000));
	}
	/* 
		pom.timer.addSeconds
		
		Adds the given number of seconds to the current date and returns that date object (representing s seconds from now)
		
		@param: s (number): How many seconds in the future
	*/
	addSeconds(s){
		/* adds seconds s to date: Used during
		testing so I don't have to sit through
		a full minute, keeping it around in case
		I need it later*/
		var owl = new Date();
		return new Date(owl.getTime() +(s* 1000));
	}
/* 
		pom.timer.getNewTime
		
		@param: t (number) time in mS to add to the current date
		@return: Date object representing t milliseconds from now
	*/
	getNewTime(t){
		
	
		var q = new Date();
	 // console.log("gettime: " + q.getTime());
		return new Date(q.getTime()+ t);
		
	}
	getEndTime(fromPause){
		console.log('getEndTime');
		fromPause = (fromPause === undefined) ? false : fromPause;
		//Determines what time the countdown will end
		//based on fromPause and isBreak
		var text;
		var end;
		console.log(this.state);
		
		if (fromPause){
			console.log('fromPause');
			// Use the time left when the user paused to get the new end time
			end = this.getNewTime(this.state.timeRemaining.total);
			this.setState({fromPause:false});
		} else {
			if (!this.state.isBreak){
				text = "Session";
				
				// Get a date object representing a session length in the future
				end = this.addMinutes(this.props.sessionLength);
				// Test mode: just do 8 second session
				if (this.props.isTestMode) {
					end = this.addSeconds(8);
				}
				
			} else {
				text = "Break";
				
				// Get a date object representing a session length in the future
				end = this.addMinutes(this.props.breakLength);
				// Test mode: just do 6 second break
				if (this.props.isTestMode) {
					end = this.addSeconds(6);
				}
			}
		}
			console.log(this.state);
		
		return end;
	}
	playPause(event) {
		console.log('playpause');
		console.log(this.state);
		// Button clicked (can only be one button but this is safer if there's ever a functionality change)
			var button = event.target.closest('button'),
				// Text for play/pause button
				buttonText = (this.state.isPaused) ? 'Pause timer' : 'Start timer';
				
			console.log(buttonText);
			console.log(this.props);
			//Click play: Start timer
			if (this.state.isPaused){
				console.log('play');
				//let fromPause = (this.state.hasStarted) ? 
				//var newTime = this.getEndTime(true);
				// If timer has been started, resume from pause, otherwise start new session
				this.endTime = this.getEndTime(this.state.hasStarted);
			
				// NEED TO REWORK THIS since setState is asyncronous and I need to know right away what the new time is we're counting down to
				this.setState({hasStarted: true});
				
				// Update globals for whether this is paused//time to end this session or break
				
				
				// Update total amount of time counting to
				this.updateTotal();
				// Start timer
				this.start();
				// Show clear button
				//jQuery('#clear').addClass('show');
			// Click pause: pause timer	
			} else {
				
				// If the length of the period (session or break) the timer is in has changed since this period started
				// use the updated period length when resuming instead of resuming from pause
				//pom.fromPause = (pom.currentLengthModified) ? false : true;
				// Stop timer
				this.stop();
				
			}
			// Change paused state
			this.setState({
				isPaused: !this.state.isPaused,
				
			});
			// Reset
			//pom.currentLengthModified = false;
			console.log(this.state);
	}
	
	stop() {
		console.log('stop');
		this.setState({isPaused: true});
		
		clearInterval(this.state.intervalID);
	}

	/* 
		pom.timer.start()
		
		Starts timer 
	*/
	start() {
		console.log('start');
		// Update the timer with the default value
		this.update();
		
		var newInterval = setInterval(this.update,1000);
	
		// Count down to the end of the session (or break): Save ID returned by setInterval so we can clear it later
		this.setState({
			intervalID: newInterval
		});
		

	}
	/* 
		pom.timer.update()
		
		Updates timer from globals set
	*/
	update(){
		//console.log('update');
/*
		var t = 0;
		if (pom.timer.endTime === 0){
			t = 0; 
		} else {
*/
			var t = this.getTimeRemaining(this.endTime);
			//console.log(end);
		
			// Total time left in mS
			var f = t.total;
			//f is milliseconds remaining
			//console.log("totalTime: " + pom.timer.totalTime);
			//b is the percentage time elapsed
			
			//pom.timer.clock.html(hours + minutes + seconds);
			//Set current time remaining in ms 
			this.setState({
				timeRemaining: t
			});
			
			
	
			// Update Progress bar
			//pom.timer.setProgress(percentageTimeElapsed);
			
			
			
			
			if(t.total <= 0){
				//console.log('switch');
				
				//Clock shows 0 and then stops
				
				clearInterval(this.state.intervalID);
				// If current period was modified (break length changed during break): Reset
				//pom.currentLengthModified = false;
				
				
				this.updateTotal();
				this.setState({
					isBreak: !this.state.isBreak
					
				});
				this.endTime = this.getEndTime();
				
				this.update();
			} else if (t.total <= 1000) {
				//pom.timer.playAudio();
			}
// 			} 
		
			
	}

	//Returns total time being counted to in ms
	updateTotal(){
		// Default: Use total time last set
		var num = this.state.totalTime;
		// This session/break should resume from pause
		if (this.fromPause){
			//console.log('fromPause');
			// When this period ends, need to reset total time (going from session to break or vice versa)
			this.setState({fromPause: false});
			
		// Going to a new session or break or starting timer after length of current period has been modified	
		} else {
			num = this.getMillisecondsTotal(this.state.isBreak, this.props.isTestMode);
/*
			if (!this.state.isBreak){
				num = this.props.sessionLength * 60000;
				// Test mode: just do 8 second session
				if (this.state.isTestMode) {
					num = 8000;
				}
				
			} else {
				num = this.props.breakLength * 60000;
				// Test mode: just do 6 second break
				if (this.state.isTestMode) {
					num = 6000;
				}
			 	
			}
*/
		}
		
		this.setState({totalTime: num});
	}
	getMillisecondsTotal(isBreak, isTestMode) {
		let minutes = (isBreak) ? this.props.breakLength : this.props.sessionLength,
			milliseconds = minutes * 60000;
		if (isTestMode) {
			milliseconds = (isBreak) ? 6000: 8000;
		}
		
		return milliseconds;
	}
	clear(event) {
		// Stop the timer
			this.stop();
			// Don't show clear button
			this.setState({hasStarted: false});
			// Clear visible countdown
			//jQuery("#timelabel, #count").html('');
			// Hide the clear button since there's nothing to clear
			//jQuery('#clear').removeClass('show');
			
			//pom.timer.setProgress(0);

	}
	getTimeRemaining() {
		let end = this.endTime;
		// New date
		var d = new Date(),
			// End date and current date in mS
			endDate = end.getTime(),
			curDate = d.getTime(),
			// Time left in mS
			totalTimeLeft = endDate - curDate,
			// Get seconds, minutes, and hours left
			seconds = Math.floor( (totalTimeLeft/1000) % 60),
			minutes = Math.floor( (totalTimeLeft/1000/60) % 60),
			hours = Math.floor( (totalTimeLeft/(1000*60*60)) % 24);
			
		
			 
			return {
				'total' : totalTimeLeft,
				'hours' : hours,
				'minutes': minutes,
				'seconds' : seconds,
			};
	}
	render() {
		let progressBar = (this.props.showProgressBar) ? <ProgressBar percentageTimeElapsed="20" /> : '',
			playPauseText = (this.state.isPaused) ? 'Start timer' : 'Pause timer',
			// Need a default end time to stop this breaking on page load
			timeRemaining = this.getTimeRemaining(),
			currentPeriod = (this.state.isBreak) ? 'Break' : 'Session',
			// Whether timer was started at some point (could be paused, but should show time and clear button)
			hasStarted = this.state.hasStarted,
			time = '',
			// Clear button
			clearButton = '',
			totalTime = this.getMillisecondsTotal(this.state.isBreak, false);
			
			if (this.state.hasStarted) {
				clearButton = <Button 
								isTextVisible={true} 
								text="Clear timer" 
								onClick={this.clear}
							/>;
				time = <Row id="timer-container">
					<div id="timelabel">{currentPeriod}</div>
					<Countdown 
						timeRemaining={this.state.timeRemaining} 
						totalTime={this.state.totalTime} 
						showProgressBar={this.props.showProgressBar}
					/>
					
				</Row>;			
							
			}
		return (
			<Section ID="progress" ariaLabelledBy="timer-heading">
				<h2 id="timer-heading">Timer</h2>
				<Row>
					<Column>
						<Button 
							isTextVisible={true} 
							ariaControls="timer-container" 
							text={playPauseText}
							onClick={this.playPause}
						/>
						{clearButton}
					</Column>
				</Row>
				{time}
			</Section>
		
			
		)
	}
}
class ProgressBar extends Component {
	render() {
		let percentageTime = this.props.percentageTimeElapsed + '%';
		return (
			<Row id="perc">
				<p id="progress-text" className="vh" aria-live="off">{percentageTime + ' of time passed'}</p>
				<div id="empty" aria-hidden="true">
					<div id="bar" style={{width: percentageTime}}></div>
				</div>
			</Row>
		);
	}
}
class Countdown extends Component {
	render() {
		var t = this.props.timeRemaining,
			f = t.total,
			percentageTimeElapsed = ((this.props.totalTime - f)/this.props.totalTime) * 100,
			hours = ('0' + t.hours + ':').slice(-2),
			minutes = ('0' + t.minutes + ':').slice(1),
			seconds = ('0' + t.seconds).slice(-2),
			progressBar = (this.props.showProgressBar) ?  <ProgressBar percentageTimeElapsed={percentageTimeElapsed} /> : '';
			//Update countdown
//			console.log(percentageTimeElapsed);
		return (
			<Fragment>
				<div id="count" role="timer" aria-live="off">
					{hours + minutes + seconds}
				</div>
				{progressBar}	
			</Fragment>	
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
