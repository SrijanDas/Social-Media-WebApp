import "./profile.css";
// firebase imports
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

import Feed from "../../components/Feed/Feed";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router";

import DefaultProfilePic from "../../assets/profile.png";
import DefaultCoverPic from "../../assets/cover.jpg";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useSelector } from "react-redux";
import Follow from "../../components/Follow/Follow";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.auth.user);
  const userId = useParams().userId;
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);
  const coverPic = DefaultCoverPic;

  useEffect(() => {
    const getImages = async () => {
      await getDownloadURL(
        ref(storage, `${user.email}/profile/${user.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };
    if (user._id !== currentUser._id) {
      if (user.profilePicture) getImages();
      else setProfilePic(DefaultProfilePic);
    } else {
      setProfilePic(currentUser.profilePicture);
      return;
    }
  }, [user, currentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="profile">
      <div className="profileRightTop">
        <div className="profileCover">
          <img className="profileCoverImg" src={coverPic} alt="" />
          <img className="profileUserImg" src={profilePic} alt="" />
        </div>
        <div className="profileInfo">
          <h4 className="profileInfoName">{user.username}</h4>
          <span className="profileInfoDesc">{user.desc}</span>
          <div className="profile__InfoFollowersContainer">
            <Link className="profile__InfoFollowers" to="/">
              <b>{user.followers?.length}</b> Followers
            </Link>
            <Link className="profile__InfoFollowing" to="/">
              <b>{user.following?.length}</b> Following
            </Link>
          </div>

          {currentUser._id === userId ? (
            <EditProfile />
          ) : (
            <Follow user={user} />
          )}
        </div>
      </div>

      <Feed userId={userId} />
    </div>
  );
}
