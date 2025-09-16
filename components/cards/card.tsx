import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Card = (post:any) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="relative w-full h-full overflow-hidden rounded-t-3xl">
        <Image
            src={post.post.thumbnailUrl || `/images/noimage.webp`}
            fill
            alt="No image available"
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority
          />
          </div>
        {post.post.title}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 280px;
    height: 360px;
    border-radius: 30px;
    background: #e0e0e0;
    box-shadow: 15px 15px 30px #bebebe,
               -15px -15px 30px #ffffff;
  }`;

export default Card;
