import React from 'react';

const style = {
  a: {
    backgroundColor: 'black',
    color: 'white',
    textDecoration: 'none',
    padding: '4px 6px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif',
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    display: 'inline-block',
    borderRadius: '3px',
  },
  span: {
    display: 'inline-block',
    padding: '2px 3px',
  },
  svg: {
    height: '12px',
    width: 'auto',
    position: 'relative',
    verticalAlign: 'middle',
    top: '-2px',
    fill: 'white',
  },
  span2: {
    display: 'inline-block',
    padding: '2px 3px',
  },
};

export function HeroAttributionBadge() {
  return (
    <a
      style={style.a}
      href="https://unsplash.com/@dhudson_creative?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
      target="_blank"
      rel="noopener noreferrer"
      title="Download free do whatever you want high-resolution photos from Debby Hudson"
    >
      <span style={style.span}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={style.svg}
          viewBox="0 0 32 32"
        >
          <title>unsplash-logo</title>
          <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
        </svg>
      </span>
      <span style={style.span2}>Debby Hudson</span>
    </a>
  );
}
