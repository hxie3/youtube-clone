import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Link, Redirect } from 'react-router-dom'

class ShowVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            video: this.props.video,
            videoId: this.props.videoId,
            videos: this.props.videos
        }

        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount(){
        this.props.fetchVideo(this.props.match.params.id)
        this.props.fetchVideos() 
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.video !== prevState.video) {
            return { video: nextProps.video };
        }
        else return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            //Perform some operation here
            this.props.fetchVideo(this.props.videoId)
            this.setState({ videoId: this.props.videoId});
        }
        document.getElementsByClassName("show-more")[0].classList.remove("hidden")
        if (document.getElementsByClassName("collapser-content")[0].offsetHeight === document.getElementsByClassName("collapser-description")[0].offsetHeight) {
            document.getElementsByClassName("show-more")[0].classList.add("hidden")
        }
    }

    handleShow(e) {
        e.preventDefault();
        const collapserContent = document.getElementsByClassName("collapser-content2")[0];
        collapserContent.classList.toggle("collapser-content");
        document.getElementsByClassName("show-more-string")[0].innerHTML === "Show less" ? (document.getElementsByClassName("show-more-string")[0].innerHTML = "Show more") : (document.getElementsByClassName("show-more-string")[0].innerHTML = "Show less");
    }

    render() {
        let { video, videos, videoId } = this.props
        if (!video) return null
        if (!videos) return null
        if (!videoId) return null
        let date = new Date(this.props.video.created_at);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return (
            <div className='show-body'>
                <div className='something'>
                    <div className='columns'>
                        <div id='primary' className='show-body-left'>
                            <div>
                                <div className='player-outer'>
                                    <div className='player-container-outer'>
                                        <div className='player-container-inner'>
                                            <div className='player-container'>
                                                <video key={this.state.video.video} className='player' controls autoPlay>
                                                    <source src={this.state.video.video} />
                                                </video>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='info'>
                                    <div className='info-contents'>
                                        <div>
                                            <h1 className='title-show'>
                                                <span className='title-show-content'>
                                                    {this.props.video.title}
                                                </span>
                                            </h1>
                                            <div className='below-title'>
                                                <div className='info-text'>
                                                    <div className='count'>
                                                        <span className='count-value'>
                                                            {this.props.video.views} views
                                                        </span>
                                                        <span>{"    "}</span>
                                                        <span className='below-title-date'>
                                                            {month}/{day}/{year}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* <div className='menu-container'>
                                                    <div className='menu'>
                                                        <div className='menu-renderer'>
                                                            <div className='top-level-buttons'>
                                                                <div className='like-button'>
                                                                    <a className='like-button-toggle'>
                                                                        <div className='like-button-button'></div>

                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bottom-border-info'>
                                    <div className='top-row'>
                                        <div className='top-row-renderer'>
                                            <div className='owner-icon'>
                                                <img className='icon-margin' src={this.props.video.profilePicture} alt="profile-pic"/>
                                            </div>
                                            <div className='upload-info'>
                                                <div className='uploader-name'>
                                                    <div className='no-long-names'>
                                                        <div className='only-block'>
                                                            <div className='display-uploader'>
                                                                {this.props.video.username}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='collapser'>
                                        <div className='collapser-content collapser-content2'>
                                            <div className='collapser-description'>
                                                <div className='description-format'>
                                                    {this.props.video.description}
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={this.handleShow} className='show-more'>
                                            <span className='show-more-string'>Show more</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='secondary' className='show-body-right'>
                            <div className='items'>
                                {(Object.values(videos)).map((videoItem, index) => {
                                    if (videoItem.id === parseInt(this.state.videoId)) return
                                    return (
                                        <div key={index} className='index-show-list'>
                                            <div className='dismissable'>
                                                <div className='video-item-show'>
                                                    <Link className='thumbnail-show' to={`/watch/${videoItem.id}`}>
                                                        <div className='after-thumbnail'>
                                                            <video source={videoItem.video} className="show-video-index">
                                                                <source src={videoItem.video}/>
                                                            </video>
                                                        </div>
                                                    </Link>
                                                </div>
                                                {/* <div className='video-item-details-show'>

                                                </div> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowVideo