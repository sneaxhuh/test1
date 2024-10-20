import React from "react";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialInstagram,
  TiSocialGithub,
} from "react-icons/ti";

const teamMembers = [
  {
    name: "Michael",
    role: "Developer",
    imgSrc: "assets/img/team/img_01.png",
    socialLinks: {
      facebook: "#",
      github: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sarah",
    role: "Designer",
    imgSrc: "assets/img/team/img_02.png",
    socialLinks: {
      facebook: "#",
      github: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "John",
    role: "Project Manager",
    imgSrc: "assets/img/team/img_03.png",
    socialLinks: {
      facebook: "#",
      github: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Emma",
    role: "Marketing Specialist",
    imgSrc: "assets/img/team/img_04.png",
    socialLinks: {
      facebook: "#",
      github: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

const Team = () => {
  return (
    <section id="team" className="team pos-rel">
      <div className="container">
        <div className="sec-title text-center mb-70">
          <h5 className="sec-title__subtitle">Our Team</h5>
          <h2 className="sec-title__title">Meet our skilled team</h2>
        </div>
      </div>
      <div className="team__wrap ul_li">
        {teamMembers.map((member, index) => (
          <div className="team__item" key={index}>
            <div className="avatar">
              <img src={member.imgSrc} alt={`Photo of ${member.name}`} />
            </div>
            <div className="team__info text-center mb-20">
              <h3>{member.name}</h3>
              <span>{member.role}</span>
            </div>
            <div className="team__social ul_li _center">
              <ul className="team__social-link link-left ul_li">
                <li>
                  <a href={member.socialLinks.facebook}>
                    <TiSocialFacebook />
                  </a>
                </li>
                <li>
                  <a href={member.socialLinks.github}>
                    <TiSocialGithub />
                  </a>
                </li>
                <li>
                  <a href={member.socialLinks.instagram}>
                    <TiSocialInstagram />
                  </a>
                </li>
                <li>
                  <a href={member.socialLinks.twitter}>
                    <TiSocialTwitter />
                  </a>
                </li>
                <li>
                  <a href={member.socialLinks.linkedin}>
                    <TiSocialLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="team__shape">
        <div className="shape shape-1">
          <img src="assets/img/shape/s_shape1.png" alt="" />
        </div>
        <div className="shape shape-2">
          <img src="assets/img/shape/s_shape2.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Team;
