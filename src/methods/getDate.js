export default function getDate(time) {
    const timestamp = time;
    const split1 = timestamp.split('T');
    const date = split1[0].replace(/\-/g, ' ');
    const splitdate = date.split(' ');
    const day = splitdate[2];
    const month = splitdate[1];
    const year = splitdate[0];

    const months = ['STYCZNIA','LUTEGO','MARCA','KWIETNIA','MAJA','CZERWCA','LIPCA','SIERPNIA','WRZEŚNIA','PAŹDZIERNIKA','LISTOPADA','GRUDNIA']
    const returnedDate = months[month-1] + " " + day + ", " + year;

    return returnedDate;
}