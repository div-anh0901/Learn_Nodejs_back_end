import { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import UpdatePostModal from '../components/posts/UpdatePostModal'
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from '../accsets/plus-circle-fill.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const DashBoard = () => {
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);
    const {
        postState: {post, posts, postsLoading },
        getPosts,
        setShowAddPostModal,
        showToast : {show ,message, type},
        setShowToast

    } = useContext(PostContext);

    useEffect(() => getPosts(), []);

    let body;

    if (postsLoading) {
        <div className="">
            <Spinner animation="border" variant="info" />
        </div>;
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">Hi {username}</Card.Header>
                    <Card.Title> Welcome to LearnIt </Card.Title>
                    <Card.Text>
                        Click the button below track your first skill to learn
                    </Card.Text>
                    <Button variant="primary"
                    onClick={setShowAddPostModal.bind(this,true)}
                    
                    >LearnIt</Button>
                </Card>
            </>
        );
    } else {
        body = (
            <>
              	<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{posts.map(post => (
						<Col key={post._id} className='my-2'>
                            <SinglePost post={post}/>
						</Col>
					))}
				</Row>
                {/* Open Add Post Modal */}
                {/* <OverlayTrigger placement='left' overlay={<Tooltip> Add a new thing to learn</Tooltip>}> */}
                    <Button 
                        className="btn-floating" 
                        onClick={setShowAddPostModal.bind(this, true)}
                    >
                        <img src={addIcon} alt="addIcon" width="60" height="60" />
                    </Button>
                {/* </OverlayTrigger> */}

            </>
        );
    }

    return <>
        {body}
        <AddPostModal />
        {post !== null && <UpdatePostModal/>}
        {/* after post id added ,show toast */}
        <Toast show={show} 	
                style={{ position: 'fixed', top: '20%', right: '10px' }} 
                className={`bg-${type} text-white`}
                onClose={setShowToast.bind(this, {show: false, message :'',type :null})
               
            }
            delay={5000}
            autohide
            animation ={false}
         >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast>

    </>;
};

export default DashBoard;
