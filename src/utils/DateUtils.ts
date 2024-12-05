export function formatDate(date: any) {
  const parsedDate = new Date(date);
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so we add 1
  const year = parsedDate.getFullYear();
  // return `${day}-${month}-${year}`;
  if (!day || !month || !year) {
    return '';
  } else {
    return `${month}-${day}-${year}`;
  }
}

export function isDate(value: any) {
  return (
    value instanceof Date ||
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
  );
}


export function getDatewithDash(date:any) {
  if(date){
  let currentDate = date
  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
  let day = String(currentDate.getDate()).padStart(2, '0');

  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
}

