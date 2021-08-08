module DownloadHelpers
    TIMEOUT = 20
    PATH = %{/home/ubuntu/Downloads/*}

    def helper_downloads
      Dir[PATH]
    end

    def helper_download
      helper_downloads.first
    end

    def helper_download_content
      wait_for_helper_download
      File.read(helper_download)
    end

    def wait_for_helper_download
      Timeout.timeout(TIMEOUT) do
        sleep 0.1 until helper_downloaded?
      end
    end

    def helper_downloaded?
      !helper_downloading? && helper_downloads.any?
    end

    def helper_downloading?
      helper_downloads.grep(/\.crhelper_download$/).any?
    end

    def clear_helper_downloads
      FileUtils.rm_f(helper_downloads)
    end
  end
