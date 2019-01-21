const sizes = [
    // {
    //     "_id": 0,
    //     "size": "8",
    // },
    // {
    //     "_id": 1,
    //     "size": "8.5",
    // },
    // {
    //     "_id": 2,
    //     "size": "9",
    // },
    // {
    //     "_id": 3,
    //     "size": "9.5",
    // },
    // {
    //     "_id": 4,
    //     "size": "10",
    // },
    // {
    //     "_id": 5,
    //     "size": "10.5",
    // },
    // {
    //     "_id": 6,
    //     "size": "11",
    // },
    // {
    //     "_id": 7,
    //     "size": "11.5",
    // },
    // {
    //     "_id": 8,
    //     "size": "12",
    // },
      8,
      8.5,
      9,
      9.5,
      10,
      10.5,
      11,
      11.5,
      12,
]

const clothe_sizes = [
    "OS",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL"
]

const colors = [
    "white",
    "black",
    "blue",
    "red",
    "yellow",
    "green",
    "purple",
    "grey",
    "silver",
    "brown",
    "beige",
    "orange",
    "gold",
    "navy",
    "pink"
]

const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "$49 and below",
        "array": [0,49]
    },
    {
        "_id": 2,
        "name": "$50 to $99",
        "array": [50,99]
    },
    {
        "_id": 3,
        "name": "$100 to $179",
        "array": [100,179]
    },
    {
        "_id": 4,
        "name": "$180 to $249",
        "array": [180,249]
    },
    {
        "_id": 5,
        "name": "$250 and above",
        "array": [250,1500]
    }
]

export {sizes, clothe_sizes, colors, price}