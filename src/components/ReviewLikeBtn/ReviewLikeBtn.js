import React, { useState } from 'react';
import styled from 'styled-components';
import { BsHeartFill, BsHeart } from 'react-icons/bs';

const ReviewLikeBtn = ({ reviewId, recommendCount }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleLikeBtn = () => {
    if (!isClicked) {
      fetch(
        `http://138.2.112.49:3003/reviews/recommend/${parseInt(reviewId)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      )
        .then(res => res.json())
        .then(res => {
          if ((res.message = 'createReviewRecommendByUser SUCCESS')) {
            alert('리뷰 좋아요를 눌렀습니다.');
          }
        });
      setIsClicked(prev => !prev);
    } else {
      fetch(
        `http://138.2.112.49:3003/reviews/recommend/${parseInt(reviewId)}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      )
        .then(res => res.json())
        .then(res => {
          if ((res.message = 'deleteReviewRecommendByUser SUCCESS')) {
            alert('리뷰 좋아요를 취소했습니다.');
          }
        });
      setIsClicked(prev => !prev);
    }
  };

  return (
    <div>
      {isClicked ? (
        <FillHeart onClick={handleLikeBtn} />
      ) : (
        <EmptyHeart onClick={handleLikeBtn} />
      )}
      <ReviewCount>{recommendCount}</ReviewCount>
    </div>
  );
};

export default ReviewLikeBtn;

const FillHeart = styled(BsHeartFill)`
  color: #ff4c4c;
  cursor: pointer;
  animation-duration: 0.5s;
  animation-name: heartBling;

  @keyframes heartBling {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8);
    }
    66% {
      transform: scale(1.4) 100% {
        transform: scale(0.9);
      }
    }
  }
`;

const EmptyHeart = styled(BsHeart)`
  color: gray;
  cursor: pointer;
`;

const ReviewCount = styled.span`
  font-size: ${props => props.theme.fontSizes.m};
  vertical-align: top;
  margin-left: 5px;
`;
