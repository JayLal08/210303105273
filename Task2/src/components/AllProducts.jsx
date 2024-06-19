import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography,  Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import { getProducts } from '../services/api';

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('AMZ');
  const [selectedCategory, setSelectedCategory] = useState('Laptop');
  const [topN, setTopN] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);


  useEffect(() => {
    fetchProducts();
  }, [selectedCompany, selectedCategory, topN,minPrice, maxPrice]);

  const fetchProducts = async () => {
    const data = await getProducts(selectedCompany, selectedCategory, topN, minPrice, maxPrice);
    setProducts(data);
  };

  return (
    <div>
      <h1>All Products</h1>
      <FormControl>
        <InputLabel>Company</InputLabel>
        <Select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
          {companies.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Top N"
        type="number"
        value={topN}
        onChange={(e) => setTopN(e.target.value)}
        inputProps={{ min: 1, max: 100 }}
        style={{ margin: '0 10px' }}
      />
      <TextField
        label="Min Price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        inputProps={{ min: 1 }}
        style={{ margin: '0 10px' }}
      />
      <TextField
        label="Max Price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        inputProps={{ min: 1 }}
        style={{ margin: '0 10px' }}
      />

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.uniqueId}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>

                {/* <Typography>Company: {product.company}</Typography>
                <Typography>Category: {product.category}</Typography> */}
                <Typography>Price: {product.price}</Typography>
                <Typography>Rating: {product.rating}</Typography>
                <Typography>Discount: {product.discount}</Typography>
                <Typography>Availability: {product.availability ? 'Available' : 'Out of Stock'}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllProducts;