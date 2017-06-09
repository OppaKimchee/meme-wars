import React, { Component } from 'react';
import './Memes.css';

class Memes extends Component {
	constructor() {
		super();
		this.state = {
			input1: true,
			input2: false
		};
	};

	memeWar = (props) => {
		if (props.war.meme1pts > props.war.meme2pts) {
			return console.log('meme1 is the winner');
		} else if (props.war.meme1pts < props.war.meme2pts) {
			return console.log('Meme2 is the winner');
		} else {
			return console.log('Meme War is tied');
		}
	};

	handleUpvote = () => {
		var selectedMeme = this.state.input1 ? 'meme1pts' : 'meme2pts';
		fetch(`/api/wars/upvote/${selectedMeme}`, {
			method: "GET",
			header: new Headers({'Content-Type': 'application/json'})
		})
		.then(res => res.json())
		.then(war => {
			this.props.warUpdated(war);
		})
		.catch(err => console.log(err));
	}

	handleToggle = () => {
		this.setState({
			input1: !this.state.input1,
			input2: !this.state.input2,
		});
	}
	render() {
		return (
			<div className="row">
					<div className="form-group">
						<div className="col-xs-6 memes">
							<label className="btn btn-primary memeLabel">
								<img src={this.props.war && this.props.war.meme1.image} alt="..." className={'img-thumbnail img-check' + (this.state.input1 && ' check')} onClick={this.handleToggle} />
								<input type="checkbox" className="hidden" autoComplete="off" />
							</label>
						</div>
						<div className="col-xs-6 memes">
							<label className="btn btn-primary memeLabel">
								<img src={this.props.war && this.props.war.meme2.image} alt="..." className={'img-thumbnail img-check' + (this.state.input2 && ' check')} onClick={this.handleToggle} />
								<input type="checkbox" className="hidden" autoComplete="off" />
							</label>
						</div>
					</div>
					<input type="submit" value="Vote" className="btn btn-default col-xs-2 memeBtn" onClick={this.handleUpvote} />
			</div>
		);
	}
};

export default Memes;