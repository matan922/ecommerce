import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { Product } from "../../features/product/productTypes"; 
import "./ProductDetailCard.scss";

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={1} className="grid-cls">
        <Card className="card-cls">
          <CardMedia
            component="img"
            alt={product.imageAlt}
            height="140"
            image={product.images}
            className="card-media-cls"
          />
          <CardContent className="card-content-cls">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="card-title-cls"
            >
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.primary">
              ${product.price}
            </Typography>
            <Button
              onClick={() => dispatch(addToCart(product.id))}
              variant="contained"
              color="primary"
            >
              Add to Cart 🛒
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ProductDetailCard;