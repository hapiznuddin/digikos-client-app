const View360 = () => {
  return (
    // * WeboBook View iframe
    <div className="w-full h-full overflow-hidden">
      <iframe
  width="100%"
  height="100%"
  allowFullScreen={true}
  allow="accelerometer; magnetometer; gyroscope"
  style={{
    display: 'block',
    margin: '20px auto',
    border: '0 none',
    maxWidth: '100%',
    borderRadius: '16px',
    boxShadow: '0 1px 1px rgba(0,0,0,0.11),0 2px 2px rgba(0,0,0,0.11),0 4px 4px rgba(0,0,0,0.11),0 6px 8px rgba(0,0,0,0.11),0 8px 16px rgba(0,0,0,0.11)',
  }}
  src="https://panoraven.com/en/embed/b6Lx0WDMxk"
    ></iframe>
      </div>
  )
}

export default View360

// * Panoraven View iframe
//   <iframe
//   width="100%"
//   height="100%"
//   allowFullScreen={true}
//   allow="accelerometer; magnetometer; gyroscope"
//   style={{
//     display: 'block',
//     margin: '20px auto',
//     border: '0 none',
//     maxWidth: '100%',
//     borderRadius: '16px',
//     boxShadow: '0 1px 1px rgba(0,0,0,0.11),0 2px 2px rgba(0,0,0,0.11),0 4px 4px rgba(0,0,0,0.11),0 6px 8px rgba(0,0,0,0.11),0 8px 16px rgba(0,0,0,0.11)',
//   }}
//   src="https://panoraven.com/en/embed/b6Lx0WDMxk"
// ></iframe>

// * webobook View iframe
// width="100%"
//       height="640"
//       style={{
//         width: '100%',
//         height: '100%',
//         border: '30px',
//         borderRadius: '16px',
//         maxWidth: '100%',
//       }}
//       allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay;"
//       // scrolling="no"
//       allowFullScreen={true}
//       // frameBorder="0"
//       src="https://webobook.com/public/651120fa7769b651bd3168c2,en?ap=true&si=false&sm=false&sp=false&sfr=true&sl=false&sop=false&"