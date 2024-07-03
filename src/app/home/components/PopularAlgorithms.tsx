import React from 'react';

function PopularAlgorithms() {
  const algorithms = [
    { name: "Factorial", link: "https://en.wikipedia.org/wiki/Factorial" },
    { name: "Fibonacci Sequence", link: "https://en.wikipedia.org/wiki/Fibonacci_number" },
    { name: "Binary Search", link: "https://en.wikipedia.org/wiki/Binary_search_algorithm" },
    { name: "Tower of Hanoi", link: "https://en.wikipedia.org/wiki/Tower_of_Hanoi" },
    { name: "Permutations", link: "https://en.wikipedia.org/wiki/Permutation" },
    { name: "Combination Sum", link: "https://leetcode.com/problems/combination-sum/" },
    { name: "N-Queens Problem", link: "https://en.wikipedia.org/wiki/Eight_queens_puzzle" },
    { name: "Merge Sort", link: "https://en.wikipedia.org/wiki/Merge_sort" }
  ];

  return (
    <div>
      <div className='text-xl font-semibold text-gray-700 w-full justify-center text-center mb-4'>
        These are some popular recursion algorithms you can implement here to visualize its recursion tree.
      </div>

      <div className='flex justify-center'>
      <ul className='list-disc list-inside text-gray-700'>
        {algorithms.map((algorithm, index) => (
          <li key={index} className='text-gray-700 mb-2'>
            <a href={algorithm.link} target='_blank' rel='noopener noreferrer' className='text-gray-700 font-semibold italic hover:underline'>
              {algorithm.name}
            </a>
          </li>
        ))}
      </ul>
      </div>

    </div>
  );
}

export default PopularAlgorithms;
