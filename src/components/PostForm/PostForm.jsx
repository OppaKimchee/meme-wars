import React, { Component } from 'react';
// import ReactS3Uploader from 'react-s3-uploader';

class PostForm extends Component {
	constructor(props) {
		super();
		this.state = {
			user: props.user,
			name: '',
			category: '',
		};
	}

	isFormInvalid() {
		return !(this.state.user && this.state.name && this.state.category);
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
			headers: new Headers({ 'Content-Type': 'application/json' }),
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
			this.props.handleSubmit();
			this.props.history.push('/');
		})
	};

	render() {
		return (
			<div>
				<header className="header-footer"> Post a Meme </header>
				<form className="form-horizontal" onSubmit={this.handleSubmit} >
					<div className="form-group">
						<div className="col-sm-12">
							<input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={(e) => this.handleChange('name', e)} />
						</div>
					</div>
					<label>
						Pick a category to post to:
						<div className="form-group">
							<div className="col-sm-12">
								<select value={this.state.category} onChange={(e) => this.handleChange('category', e)} >
									<option value="Funny">Funny</option>
									<option value="Sad">Sad</option>
									<option value="U Mad Bro?">U Mad Bro?</option>
									<option value="Cute">Cute</option>
								</select>
							</div>
						</div>
					</label>
					<div className="form-group">
						<div className="col-sm-12 text-center">
							<button className="btn btn-default" disabled={this.isFormInvalid()}>Submit</button>
						</div>
					</div>
				</form>
				{/*<ReactS3Uploader
					signingUrl="/api/posts"
					signingUrlMethod="GET"
					accept="image/*"
					signingUrlHeaders={{ "Access-Control-Allow-Origin": '*' }}
					uploadRequestHeaders={{ "Access-Control-Allow-Origin": '*' }}
					server="http://localhost:3001"
					onFinish={this.onUploadFinish}
				/>*/}
			</div>
		);
	}
}

export default PostForm;