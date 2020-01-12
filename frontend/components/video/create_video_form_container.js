import { connect } from 'react-redux';
import VideoForm from './video_form';
import { createVideo } from '../../actions/video_actions'

const mapStateToProps = (state) => ({
    video: {
        title: '',
        description: '',
        user_id: state.session.id
    },
    formType: 'Create Video'
})

const mapDispatchToProps = dispatch => ({
    processForm : (video) => dispatch(createVideo(video))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoForm)