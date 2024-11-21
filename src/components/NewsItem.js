import React, { Component } from 'react'

export class NewsItem extends Component {

    filterAuthor = (author) => {
        if (author === null) {
            return "Unknown";
        }
        if (author.length > 17) {
            return author.slice(0, 17);
        }
        return author;
    }

    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
        <div className="my-3">
            <div className="card" style={{ height: '450px', width: '415px'}}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill text-bg-danger" style={{left: '90%', zIndex: '1'}}>{source}</span>
                <img src={imageUrl?imageUrl:"https://dims.apnews.com/dims4/default/be65353/2147483647/strip/true/crop/5535x3113+0+288/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fca%2F37%2F7375cc65ea7e6e4f29dae97dbca3%2Fc6153de152f74f0fa21105759ad5a27e"}
                     className="card-img-top" alt="..." style={{ height: '234px', width: '415px', objectFit: 'cover' }}/>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {this.filterAuthor(author)} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary mt-auto">Read More...</a>
                </div>
            </div>
        </div>
        )
    }
}

export default NewsItem
