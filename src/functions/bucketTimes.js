import { format } from 'date-fns';

function bucketTimes(times) {
  const bucket = {};

  times.forEach(current => {
    const date = format(current.timeStamp, 'MM/dd/yyyy');
    const dateBucket = bucket[date] ?? (bucket[date] = []);
    dateBucket.push(current);
  });

  bucket.dates = Object.keys(bucket).sort((a, b) => {
    const [aMonth, aDate, aYear] = a.split('/');
    const [bMonth, bDate, bYear] = b.split('/');
    return bYear - aYear || bMonth - aMonth || bDate - aDate;
  });

  return bucket;
}

export default bucketTimes;
