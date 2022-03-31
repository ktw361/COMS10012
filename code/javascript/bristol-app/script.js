window.onload = function () {
  let wards = fetch('https://opendata.bristol.gov.uk/api/v2/catalog/datasets/wards/records?limit=50&select=name,ward_id')
    .then(response => response.json())
    .then(populateWards)
    .catch(err => console.log(err));
}

function createElementText(tag, text, func=e=>e) {
  let elem = document.createElement(tag);
  elem.textContent = text;
  elem = func(elem);
  return elem;
}
function createElementWith(tag, xs, func=e=>e) {
  let elem = document.createElement(tag);
  for (const x of xs) {
    elem.appendChild(x);
  }
  elem = func(elem);
  return elem;
}
function createFragmentWith(xs) {
  let elem = new DocumentFragment();
  for (const x of xs) {
    elem.append(x);
  }
  return elem;
}

function populateWards(wards) {

  let buttons = new DocumentFragment();

  // wards.records.sort((a, b) => {
  //   const na = a.record.fields.name;
  //   const nb = b.record.fields.name;
  //   if (na < nb) { return -1; }
  //   if (na > nb) { return 1; }
  //   return 0;
  // });
  wards.records.sort((a, b) => a.record.fields.name.localeCompare(b.record.fields.name));

  wards.records.forEach(w => {
      const [id, name] = [w.record.fields.ward_id, w.record.fields.name];
      const b = document.createElement("button");
      b.textContent = name;
      // b.onclick = displayData(id, name);
      b.addEventListener('click', () => {
        displayData(id, name)();
      });
      // Or:
      // b.addEventListener('click', displayData(id, name));

      // b.style.width = '100%';
      b.style.gridColumn = 'span 1';
      b.style.backgroundColor = 'cyan';
      buttons.appendChild(b);
  });

  let nav = document.getElementById("nav");
  nav.textContent = '';
  nav.append(buttons);
}

function displayData(id, name) {

  function buildPopulation(records) {

    // Make heading
    let heading = document.createElement('h2');
    heading.textContent = 'Population';

    // Make table
    let table = document.createElement('table');
    table.setAttribute('id','populationTable');
    // Make table header
    let header = document.createElement('tr');
    header.innerHTML = '<th>Year</th><th>Population</th></tr>';
    table.appendChild(header);

    records.filter(d => d.record.fields.mid_year >= 2015)
      .sort((x1, x2) => x1.record.fields.mid_year < x2.record.fields.mid_year ? -1 : 1)
      .map(r =>
          createElementWith('tr', [
            createElementText('td', r.record.fields.mid_year),
            createElementText('td', r.record.fields.population_estimate)
          ]))
      .map(elem => table.appendChild(elem));

    // Populate table
    // records.sort((x1, x2) => x1.record.fields.mid_year < x2.record.fields.mid_year ? -1 : 1)
    //   .filter(r => r.record.fields.mid_year > 2015)
    //   .forEach(r => {
    //     let year = document.createElement('td');
    //     year.textContent = r.record.fields.mid_year;
    //     let population = document.createElement('td');
    //     population.textContent = r.record.fields.population_estimate;

    //     let row = document.createElement('tr');
    //     row.append(year, population);
    //     table.appendChild(row);
    // });

    let population = new DocumentFragment();
    population.append(heading, table);

    return population;
  }

  function buildExpectancy(records) {
    let heading = document.createElement('h2');
    heading.textContent = 'Life Expectancy';

    let table = document.createElement('table');
    table.setAttribute('id', 'ExpectancyTable');

    let header = document.createElement('tr');
    header.innerHTML = '<th>Year</th><th>Male Life Expectancy</th><th>Femail Life Expectancy</th></tr>';
    table.appendChild(header)

    records.sort((a, b) => a.record.fields.year < b.record.fields.year ? -1 : 1)
      .forEach(r => {
        let year = document.createElement('td');
        year.textContent = r.record.fields.year;
        let female_exp = document.createElement('td');
        female_exp.textContent = (r.record.fields.female_life_expectancy).toFixed(2);
        let male_exp = document.createElement('td');
        male_exp.textContent = (r.record.fields.male_life_expectancy).toFixed(2);

        let row = document.createElement('tr');
        row.append(year, male_exp, female_exp);
        table.appendChild(row);
    });

    let lifeexp = new DocumentFragment();
    lifeexp.append(heading, table);
    return lifeexp;
  }

  return function () {
    const fetch_pop = fetch(`https://opendata.bristol.gov.uk/api/v2/catalog/datasets/population-estimates-time-series-ward/records?limit=20&select=mid_year,population_estimate&refine=ward_2016_code:${id}`);
    const fetch_exp = fetch(`https://opendata.bristol.gov.uk/api/v2/catalog/datasets/life-expectancy-in-bristol/records?limit=20&select=year,female_life_expectancy,male_life_expectancy&refine=ward_code:${id}`);
    Promise.all([fetch_pop, fetch_exp])
      .then(response => Promise.all(response.map(r => r.json())))
      .then(([d1, d2]) => {
        // const [d1, d2] = data;
      // .then(data => {
      //   const [d1, d2] = data;

        let heading = document.createElement('h1');
        heading.textContent = name;

        const population = createFragmentWith(
          [
            createElementText('h2', 'Population'),
            createElementWith('table', [
              createElementText('tr', '', e=>{
                e.innerHTML = '<th>Year</th><th>Population</th></tr>';
                return e;
              }),
              ...d1.records.filter(d => d.record.fields.mid_year >= 2015)
                .sort((x1, x2) => x1.record.fields.mid_year < x2.record.fields.mid_year ? -1 : 1)
                .map(r =>
                  createElementWith('tr', [
                    createElementText('td', r.record.fields.mid_year),
                    createElementText('td', r.record.fields.population_estimate)
                  ]))
            ], tab=>{
              tab.setAttribute('id','populationTable');
              return tab;
            })
          ]);
        const lifeexp = createFragmentWith(
          [
            createElementText('h2', 'Life Expectancy'),
            createElementWith('table', [
              createElementText('tr', '', e=>{
                e.innerHTML = '<th>Year</th><th>Male Expectancy</th><th>Female Expectancy</th></tr>';
                return e;
              }),
              ...d2.records
                .sort((x1, x2) => x1.record.fields.year < x2.record.fields.year ? -1 : 1)
                .map(r =>
                  createElementWith('tr', [
                    createElementText('td', r.record.fields.year),
                    createElementText('td', r.record.fields.male_life_expectancy.toFixed(2)),
                    createElementText('td', r.record.fields.female_life_expectancy.toFixed(2)),
                  ]))
            ], tab=>{
              tab.setAttribute('id','ExpectancyTable');
              return tab;
            })
          ]);
        // let population = buildPopulation(d1.records);
        // let lifeexp = buildExpectancy(d2.records);

        let dataPane = document.getElementById("dataPane");
        dataPane.textContent = '';
        dataPane.append(heading, population, lifeexp);
    })
      .catch(err => console.log(err));
  }
}
