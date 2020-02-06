const fetchData = async (url) => {
    const res = await fetch(url);
    const res2 = await res.json()
    return res2
  }

  export default fetchData