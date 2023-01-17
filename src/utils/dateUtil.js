export function getLocalDate(dt) {
  const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    time: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  let localDate = '';
  if (dt) {
    const seconds = dt.seconds * 1000;
    localDate = seconds
      ? new Date(seconds).toLocaleString('tr-TR', options)
      : 'n/a';
  }

  return localDate;
}

export function getLocalDate2(dt) {
  const dtms = Math.floor(new Date(dt).getTime() / 1000);
  console.log('locale ', dtms);

  const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    time: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  let localDate = '';
  if (dt) {
    const seconds = dt.seconds * 1000;
    localDate = seconds
      ? new Date(seconds).toLocaleString('tr-TR', options)
      : 'n/a';
  }

  return localDate;
}
