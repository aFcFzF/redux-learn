const permute = (nums) => {
  if (nums.length === 1) {
    return [...nums];
  }

  // [[1, 2]]
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const restNums = nums.filter((_, idx) => idx !== i);
    console.log(restNums);
    const subNums = permute(restNums);

    for (const item of subNums) {
      result.push([currentNum, ...item]);
    }
  }

  return result;
};

console.log(permute([1, 2, 3]));
// 目标 123、132、213、231、312、321
