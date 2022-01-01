// funkcja która ładuje dane z mockaroo

function loader(){
    const dbParam = JSON.stringify({table:"group_project",limit:20});
    const xmlhttp = new XMLHttpRequest();     

    //tablica do wykresów

    const countries = [];
    //const ballances = []
    
    xmlhttp.onload = function() {
      myObj = JSON.parse(this.responseText);
      let text = "<table border='1'>"         //początek tabeli


      //ładowanie danych do tabeli za pomocą pętli

      for (let x in myObj) {
            text += "<tr><td>" + myObj[x].id + "</td><td>"+myObj[x].first_name+ "</td><td>"+myObj[x].last_name+ "</td><td>"+myObj[x].email
            + "</td><td>"+myObj[x].age+ "</td><td>"+myObj[x].gender+ "</td><td>"+myObj[x].is_maried+ "</td><td>"+myObj[x].country+ "</td><td>"+myObj[x].ballance_usd;
            
            //dodawanie do tabeli

            countries[x]=myObj[x].country;
            }
            text += "</tr></table>"
            

      document.getElementById("content").innerHTML = text;
      
      dataprep(countries)
    }

    //łączenie z mockaroo

    xmlhttp.open("GET", "https://my.api.mockaroo.com/group_project.json?key=ad9372e0", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);


}

// funkcja która czyści div "content"

function reset()
{
   document.getElementById("content").innerHTML ="";
}

function sort(counters)
{
  for (let i in counters)
  {
    for (let j in counters)
    {
      if(counters[j] < counters[j+1])
      {
        temp1 = counters[j];
        counters[j] = counters[j+1];
        counters[j+1] = temp1;
        //swap(unique[i],unique[j]);
      }
    }
    console.log(counters)
  }

  return counters
}

function dataprep(countries)
{
  const unique = [countries[0]];
  var counters = [0];
  var i1 = 0;
  var i2 = 0;
  var temp1 = 0;
  var temp2 = "";
  var a = 0; 
  const tab1 = []
  const tab2 = []

  let test = true;
  
  //unikalna tablica

  for (let x in countries)
  {
    for (let i in unique)
    {
      if (countries[x] == unique[i])
      {
        test = false;
      }
    }
    if (test)
    {
      unique.push(countries[x]);
      
    }
    test = true;
  }

  for (let i in unique)
  {
    for (let x in countries)
    {
      if (countries[x] == unique[i])
      {
        if(Number.isInteger(counters[i])) // nan + 1 daje nan :D
        {
          counters[i] += 1;
        }
        else
        {
          counters[i] = 1;
        }
      }
    }
  }

  while (i1 < counters.length) // ta kurwa jebana nie chciała działać na for
  {
    while (i2 < (counters.length - 1)) // teraz działa (magicznie)
    {
      if (counters[i2] < counters[i2+1]) // chuj jej w dupe - niech ktoś to kurwa za mnie naprawi :c
      {
        temp1 = counters[i2];
        counters[i2] = counters[i2+1];
        counters[i2+1] = temp1;
        temp2 = unique[i2];
        unique[i2] = unique[i2 + 1];
        unique[i2 + 1] = temp2;
      }
      i2 += 1;
    }
    i1 += 1;
    i2 = 0;
  }

  // ucinanie tablic do top 5

  for (i = 0; i < 5; i++)
  {
    tab1[i] = unique[i];
    tab2[i] = counters[i];
  }

  for (i = 5; i < counters.length; i++) // sumowanie reszty
  {
    a += counters[i];
  }

  tab2.push(a);

  tab1.push("Others");

  charts(tab1, tab2)
  charts2(tab1, tab2)
}

// w końcu wykresy xd

function charts(unique, counters) // przeklejone tak mocno, że to od samego patrzenia mi sie powieki kleją
{
  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: unique,
        datasets: [{
            label: '# of countries in the data (6 most frequent)',
            data: counters,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

//wykres 2

function charts2(unique, counters)
{
  const ctx = document.getElementById('myChart2');
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: unique,
        datasets: [{
            label: '# of countries in the data',
            data: counters,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}