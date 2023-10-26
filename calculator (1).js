const digits = {
  Z: 2000,
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  VIII: 8,
  VII: 7,
  VI: 6,
  V: 5,
  IV: 4,
  III: 3,
  II: 2,
  I: 1,

};



const stringVal = string =>{
    let pattern = /[^IXV0-9+*\/-\s]/g;
    if([...string.matchAll(pattern)].length >= 1 ) {
        throw new Error ('Некорректные символы');
    }
    pattern = /[+*\/-]{2,}/g;
    if([...string.matchAll(pattern)].length >= 1 ) {
      throw new Error ('В строке больше одного операнда');
  }
    return true;
  };

  const getOperation = string => {
    return [...string.match(/[+*\/-]/g)][0];
  };


  const getNums = string =>{
    return string.split(/[+*\/-]/g).map(num => num.trim());
  };

const romanToArabian = string =>{
  return string.split('').reduce((prevVal, currentVal, i, arr ) => {

  const [a, b, c] = [
    digits[arr[i]],
    digits[arr[i + 1]],
    digits[arr[i + 2]],
  ];
  return b > a ? prevVal - a : prevVal + a;
  }, 0);
};

    const isRoman = string =>{
      const pattern = (/^[IVX]+$/);
      let arrNums = string.split(/[+*\/-]/g).map(num => num.trim());
      const countRoman = arrNums.reduce((prevVal, currentVal) => prevVal + pattern.test(currentVal), 0);
      if(countRoman === 1 ) {
        throw new Error('Оба числа маст римскими или арабскими');
      } else if (countRoman === 2) {
        //перевести из римских в арабские
        arrNums = arrNums.map(num => romanToArabian(num));
        return true;
      }
      
    };

    const sum = nums => {
      return nums.reduce((a, b) => a + b);
    };

    const mult = nums => {
      return nums.reduce((a, b) => a * b);
    };

    const division = nums => {
      return nums.reduce((a, b) => a / b);
    };

    const subtraction = nums => {
      return nums.reduce((a, b) => a - b);
    };

  const checkOperation = (str, nums) => {
    let result;
    if(str === '+') {
    result = sum(nums)
    } else if (str === '*') {
    result =  mult(nums)
    } else if (str === '/') {
    result = division(nums)
    } else if (str === '-') {
    result =  subtraction(nums)
    }
    return Math.floor(result);
  };


  const calculator = (string) => {
  const isValid = stringVal(string);
  const operation = getOperation(string);
  let nums = getNums(string);
  const roman = isRoman(string);
  if(roman) {
    nums = nums.map(num => romanToArabian(num));
  }
  nums = nums.map(num => +num);
    let result =  checkOperation(operation, nums);
    if( result < 0 ){
      return '';
    }
    return result;
  };
  
  console.log(calculator('X-V'));
