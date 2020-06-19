let mkChart = () => {
  c3.generate({
    data: {
      columns: array,
      type: 'pie',
      order: null
    }
  });
}