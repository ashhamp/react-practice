class Api::BandsController < ApplicationController

  def index
    @bands = Band.all
    render json: @bands
  end

  def create
    @band = Band.new(band_params)

    if @band.save
      render json: @band
    else
      render json: { status: 500, message: "Band not saved" }
    end
  end

  def destroy
    @band = Band.find(params[:id])

    if @band.destroy!
      render json: { status: 200 }
    else
      render json: {status: 500, message: "Band not found"}
    end
  end

  private

  def band_params
    params.require(:band).permit(:name)
  end
end
