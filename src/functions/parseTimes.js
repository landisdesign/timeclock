import { format } from 'date-fns';

function parseTimes(date, times) {
  return times.map((current, index, array) => {
    const currentTimestamp = current.timestamp;
    const time = format(currentTimestamp, 'HH:mm');
  
    if (current.comment === '\u0001') {
      return { ...current, comment: '—', date, time, duration: 0, durationString: '' };
    }
  
    const prior = array[index - 1];
    if (!prior) {
      return { ...current, date, time, duration: 0, durationString: '0:00' };
    }
  
    const priorTimestamp = prior.timestamp;
    const duration = Math.trunc((currentTimestamp - priorTimestamp) / 60000);
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    const minuteText = `00${minutes}`.slice(-2);
  
    return { ...current, date, time, duration, durationString: `${hours}:${minuteText}`}
  });
}

export default parseTimes;
