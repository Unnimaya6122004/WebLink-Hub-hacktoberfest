#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> arrayRankTransform(vector<int>& arr) {
        vector<int> a = arr;
        sort(a.begin(), a.end());
        unordered_map<int, int> mp;
        int rank = 1;

        for (int i = 0; i < a.size(); ++i) {
            // Only assign a rank for the first occurrence of a unique number
            if (i == 0 || a[i] != a[i - 1]) {
                mp[a[i]] = rank++;
            }
        }

        // Replace each element in the original array with its rank
        for (auto &x : arr) {
            x = mp[x];
        }
        return arr;
    }
};

int main() {
    Solution sol;
    vector<int> arr = {40, 10, 20, 30};
    vector<int> result = sol.arrayRankTransform(arr);

    cout << "Transformed array: ";
    for (int x : result) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}
