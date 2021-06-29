import { Injectable } from "@nestjs/common";

import { ModelType, DocumentType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { Types } from "mongoose";

import { ReviewModel } from "./review.model";
import { CreateReviewDto } from "./dto/create-review.dto";

@Injectable()
export class ReviewService {
  constructor(
     @InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>
  ) { }

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<Array<DocumentType<ReviewModel>>> {
    return this.reviewModel.find({ productId: Types.ObjectId(productId) }).exec();
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel.deleteMany({ productId: Types.ObjectId(productId) }).exec();
  }
}
