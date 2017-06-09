import React, { Component } from 'react';
import './PostForm.css';

class PostForm extends Component {
	constructor(props) {
		super();
		this.state = {
			name: '',
			image: '',
			category: '',
		};
	}

	isFormInvalid() {
		return !(this.state.name && this.state.image && this.state.category);
	}

	handleChange = (field, e) => {
		this.setState({
			// Using ES2015 Computed Property Names
			[field]: e.target.value
		}); 
	}

	submitPost = (post) => {
		return fetch('/api/posts/submit', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				'UserId': sessionStorage.getItem('userId')
			}),
			body: JSON.stringify(post)
		})
			.then(res => {
				return res.json();
			})
			.then(post => post);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.submitPost(this.state)
			.then(() => {
				this.props.history.push('/');
			})
	};

	render() {
		return (
			<div className="text-center" style={{padding:50}}>
				<div className="logo">Submit a Meme!</div>
				<div className="meme-form-1">
					<form id="meme-form" className="text-left" onSubmit={this.handleSubmit}>
						<div className="meme-form-main-message"></div>
						<div className="main-meme-form">
							<div className="meme-group">
								<div className="form-group">
									<label htmlFor="lg_name" className="sr-only">Give your meme an awesome name: </label>
									<input type="text" className="form-control" value={this.state.name} onChange={(e) => this.handleChange('name', e)} id="lg_name" name="lg_name" placeholder="Name" />
								</div>
								<div className="form-group">
									<label htmlFor="lg_image" className="sr-only">Post your Image URL</label>
									<input type="text" className="form-control" value={this.state.image} onChange={(e) => this.handleChange('image', e)} id="lg_image" name="lg_image" placeholder="Image URL" />
								</div>
								<div className="form-group">
									<label htmlFor="lg_category" className="sr-only">Pick a Category: </label>
									<select value={this.state.category} onChange={(e) => this.handleChange('category', e)} >
										<option value="Options">Please Choose a Category</option>
										<option value="Funny">Funny</option>
										<option value="Sad">Sad</option>
										<option value="U Mad Bro?">U Mad Bro?</option>
										<option value="Cute">Cute</option>
									</select>
								</div>
							</div>
							<button type="submit" className="meme-button" disabled={this.isFormInvalid()}><i className="glyphicon glyphicon-chevron-right"></i></button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default PostForm;