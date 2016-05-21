class Api::BandsController < ApplicationController

  def index
    @bands = Band.all
    render json: @bands
  end

  def create
    @bands = Band.all
    @band = Band.new(band_params)

    if @band.save
      flash[:notice] = "Band saved successfully!"
      redirect_to bands_path
    else
      flash[:error] = @band.errors.full_messages.join('. ')
      render :index
    end
  end

  private

  def band_params
    params.require(:band).permit(:name)
  end
end
