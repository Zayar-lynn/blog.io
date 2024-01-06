const fakePosts = [
    {
        id: 1,
        username: "Aenean",
        time: "2024-01-01",
        title: "Praesent ac",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit morbi velit semper massa, eleifend neque nullam inceptos facilisis porta senectus per nostra scelerisque. Feugiat luctus morbi facilisi facilisis faucibus placerat nullam molestie dui augue non, eget mollis tincidunt ullamcorper rutrum ad proin turpis scelerisque sed, rhoncus ridiculus sem cursus tortor tristique vivamus donec natoque imperdiet. Ullamcorper dictum massa turpis ligula dictumst sagittis venenatis, felis non maecenas class arcu habitant suspendisse, ridiculus magnis cras scelerisque sollicitudin interdum. Torquent montes volutpat curae suspendisse proin conubia etiam vehicula ultrices sociosqu, convallis purus elementum porttitor pretium natoque a ac semper, nisl eleifend scelerisque sagittis neque faucibus porta ornare nunc. Morbi curabitur ante fames dictum fusce quisque praesent quis, venenatis massa aliquam vivamus nam mauris tincidunt, sodales lectus nulla hac arcu primis hendrerit. Risus leo potenti tortor facilisi rhoncus ac eros dis, platea nostra nisl varius dui aptent malesuada semper eget, lobortis quis vivamus nibh lectus fringilla curabitur. Natoque cubilia torquent sociis urna, facilisis aliquet ridiculus dapibus tincidunt, sollicitudin aliquam nibh.",
        image: "https://imgs.search.brave.com/WlvKBxDivE6GE9bsBqJ6uzrILJji1A_JNTGCeUijVlY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/cm9ncmFtbWluZy1i/YWNrZ3JvdW5kLXdp/dGgtcGVyc29uLXdv/cmtpbmctd2l0aC1j/b2Rlcy1jb21wdXRl/cl8yMy0yMTUwMDEw/MTI1LmpwZz9zaXpl/PTYyNiZleHQ9anBn",
    },
    {
        id: 2,
        username: "Fusce",
        time: "2024-01-01",
        title: "Quisque id",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit morbi velit semper massa, eleifend neque nullam inceptos facilisis porta senectus per nostra scelerisque. Feugiat luctus morbi facilisi facilisis faucibus placerat nullam molestie dui augue non, eget mollis tincidunt ullamcorper rutrum ad proin turpis scelerisque sed, rhoncus ridiculus sem cursus tortor tristique vivamus donec natoque imperdiet. Ullamcorper dictum massa turpis ligula dictumst sagittis venenatis, felis non maecenas class arcu habitant suspendisse, ridiculus magnis cras scelerisque sollicitudin interdum. Torquent montes volutpat curae suspendisse proin conubia etiam vehicula ultrices sociosqu, convallis purus elementum porttitor pretium natoque a ac semper, nisl eleifend scelerisque sagittis neque faucibus porta ornare nunc. Morbi curabitur ante fames dictum fusce quisque praesent quis, venenatis massa aliquam vivamus nam mauris tincidunt, sodales lectus nulla hac arcu primis hendrerit. Risus leo potenti tortor facilisi rhoncus ac eros dis, platea nostra nisl varius dui aptent malesuada semper eget, lobortis quis vivamus nibh lectus fringilla curabitur. Natoque cubilia torquent sociis urna, facilisis aliquet ridiculus dapibus tincidunt, sollicitudin aliquam nibh.",
        image: "https://imgs.search.brave.com/GdaM1ar2yWfuZKv0xID4Ukkv9unckAn9YLA4kV2NhRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MDIxODIxMC9waG90/by9jbG9zZS11cC1j/b21wdXRlci1jb2Rl/LW9uLXNjcmVlbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QUl2bklmWG9Eangt/ZW11OG9rRWtpMTNa/MVpBZ1B1WnFBOFhU/al9hTC1tST0",
    },
    {
        id: 3,
        username: "Nunc",
        time: "2024-01-01",
        title: "Cum sociis",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit morbi velit semper massa, eleifend neque nullam inceptos facilisis porta senectus per nostra scelerisque. Feugiat luctus morbi facilisi facilisis faucibus placerat nullam molestie dui augue non, eget mollis tincidunt ullamcorper rutrum ad proin turpis scelerisque sed, rhoncus ridiculus sem cursus tortor tristique vivamus donec natoque imperdiet. Ullamcorper dictum massa turpis ligula dictumst sagittis venenatis, felis non maecenas class arcu habitant suspendisse, ridiculus magnis cras scelerisque sollicitudin interdum. Torquent montes volutpat curae suspendisse proin conubia etiam vehicula ultrices sociosqu, convallis purus elementum porttitor pretium natoque a ac semper, nisl eleifend scelerisque sagittis neque faucibus porta ornare nunc. Morbi curabitur ante fames dictum fusce quisque praesent quis, venenatis massa aliquam vivamus nam mauris tincidunt, sodales lectus nulla hac arcu primis hendrerit. Risus leo potenti tortor facilisi rhoncus ac eros dis, platea nostra nisl varius dui aptent malesuada semper eget, lobortis quis vivamus nibh lectus fringilla curabitur. Natoque cubilia torquent sociis urna, facilisis aliquet ridiculus dapibus tincidunt, sollicitudin aliquam nibh.",
        image: "https://imgs.search.brave.com/23053n1o1U42WSYiuGuOQV5BK2AKBZAbLPuWMKoR2Po/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTgwNTAxMDgwMjMt/YzUyNDlmNGRmMDg1/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4Tkh4OFky/OWthVzVuZkdWdWZE/QjhmREI4Zkh3dw",
    }
];
export default fakePosts;