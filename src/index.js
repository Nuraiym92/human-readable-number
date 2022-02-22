module.exports = function toReadable (number) {
    let numToWords = number => {
        let a = [
          '', 'one', 'two', 'three', 'four',
          'five', 'six', 'seven', 'eight', 'nine',
          'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
          'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
        ];
        let b = [
          '', '', 'twenty', 'thirty', 'forty',
          'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
        ];
        let g = [
          '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
          'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
        ];
        // this part is really nasty still
        // it might edit this again later to show how Monoids could fix this up
        let makeGroup = ([ones,tens,huns]) => {
          return [
            num(huns) === 0 ? '' : a[huns] + ' hundred ',
            num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
            a[tens+ones] || a[ones]
          ].join('');
        };
        // "thousands" constructor; no real good names for this, i guess
        let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
        // execute !
        if (typeof n === 'number') return numToWords(String(n));
        if (n === '0')             return 'zero';
        return comp (chunk(3)) (reverse) (arr(n))
          .map(makeGroup)
          .map(thousand)
          .filter(comp(not)(isEmpty))
          .reverse()
          .join(' ');
      };
}
