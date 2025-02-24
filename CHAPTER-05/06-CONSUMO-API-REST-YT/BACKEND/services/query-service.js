

const getFrameURl = (item) => {
  return "https://" + item.player.embedHtml.substring(40, 73);
};


export {getFrameURl}